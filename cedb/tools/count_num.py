import pymongo
import json
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb

##primary
c = db.sample_info.distinct("cancer_nor",{"Biosample_type":"Primary tissue"})
len(c)
p = db.sample_info.distinct("GEO_id",{"Biosample_type":"Primary tissue"})
len(p)
s = db.sample_info.distinct("GSM_id",{"Biosample_type":"Primary tissue"})
len(s)


#cell line
c = db.sample_info.distinct("cancer_nor",{"Biosample_type":"Cell line"})
len(c)
p = db.sample_info.distinct("GEO_id",{"Biosample_type":"Cell line"})
len(p)
s = db.sample_info.distinct("GSM_id",{"Biosample_type":"Cell line"})
len(s)
