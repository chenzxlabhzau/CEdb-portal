import pymongo
import json
import argparse,os
from scipy.stats import fisher_exact
import numpy as np
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb


# all_tfs = list(db.TF.aggregate( [
#    {
#      "$group": {
#         "_id": "$motif_name",
#         "count": {"$sum": 1}
#      }
#    }
# ]))

#由于有重复，只能distinct算了
all_dict = {}
for i in db.TF.distinct("motif_name"):
    all_dict[i]=len(db.TF.distinct("sample_id",{"motif_name":i}))

db.TF_stat.drop()

for cancer_abbr in db.sample_info.distinct("cancer_abbr"):
    cancer_num = db.sample_info.find({"cancer_abbr":cancer_abbr}).count()
    motif_names = db.TF.distinct("motif_name",{"cancer_abbr":cancer_abbr})
    print(cancer_abbr)
    print(len(motif_names))
    primary_num = len(db.TF.distinct("sample_id", {"cancer_abbr": cancer_abbr,
                                                   "Biosample_type": "Primary tissue"}))
    cell_num = len(db.TF.distinct("sample_id", {"cancer_abbr": cancer_abbr,
                                                "Biosample_type": "Cell line"}))
    for motif_name in motif_names:
        primary_tf_num = len(db.TF.distinct("sample_id",{"cancer_abbr":cancer_abbr,"motif_name":motif_name,"Biosample_type":"Primary tissue"}))
        cell_tf_num = len(db.TF.distinct("sample_id",{"cancer_abbr":cancer_abbr,"motif_name":motif_name,"Biosample_type":"Cell line"}))
        cancer_tf_sum = primary_tf_num + cell_tf_num
        table=np.array([[cancer_tf_sum, all_dict[motif_name]],
                        [cancer_num-cancer_tf_sum, 1483-all_dict[motif_name]]])
        oddsr, pvalue = fisher_exact(table, alternative='two-sided')
        if oddsr==float('inf'):
            oddsr=1000
        record = {"motif_name": motif_name,
                  "cancer_abbr": cancer_abbr,
                  "cancer_num": cancer_num,
                  "cancer_tf_sum": cancer_tf_sum,
                  "primary_tf_num": primary_tf_num,
                  "cell_tf_num": cell_tf_num,
                  "primary_num": primary_num,
                  "cell_num": cell_num,
                  "all_cancer_num": all_dict[motif_name],
                  "oddsr": oddsr,
                  "pvalue": pvalue}
        db.TF_stat.insert_one(record)



