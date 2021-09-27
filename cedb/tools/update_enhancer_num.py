import pymongo
import json
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb


def update_info():
    for i in db.sample_info.find():
        i["enhancer_number"]=db[i['sample_id']].find().count()
        db.sample_info.update_one({"GSM_id":i["GSM_id"]},{"$set":i
        })

##计算super enhancer不同染色体上的分�?
def update_percent():
    chrs = ["chr1","chr2","chr3","chr4","chr5","chr6","chr7",
        "chr8","chr9","chr10","chr11","chr12","chr13","chr14","chr15",
        "chr16","chr17","chr18","chr19","chr20","chr21","chr22","chrX"
    ]
    for i in db.sample_info.find():
        ll = []
        kk = []
        #super_sum_num = db.super_enhancer.find({"GSM_id": i["GSM_id"]}).count()
        #typical_sum_num = db[i["sample_id"]].find({"GSM_id": i["GSM_id"]}).count()
        if "super_enhancer_distribution" in i.keys() and "typical_enhancer_distribution" in i.keys():
            print("is ok")
            continue
        for chr in chrs:
            kk.append({"chr":chr,"value":int(db[i["sample_id"]].find({"chr":chr}).count())})
            ll.append({"chr":chr,"value":int(db.super_enhancer.find({"sample_id": i["sample_id"],"chr":chr}).count())})
        i["super_enhancer_distribution"]=ll
        i["typical_enhancer_distribution"] = kk
        print(i["GSM_id"])
        db.sample_info.update_one({"GSM_id":i["GSM_id"]},{"$set":i
        })

