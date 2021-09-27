import pymongo
import json
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb


def update_info():
    for i in db.sample_info.find():
        if i["Biosample_type"]=="Primary tissue":
            record = db.srr2gsm.find_one({"GSM":i["GSM_id"]})
            i["title"]=record["TITLE"]
            i['input']=record["INPUT"]
            i['normal'] = record["normal"]
            i['normal_input'] = record["normal_input"]
            i['layout'] = record["layout"]
            CEdb.sample_info.update_one({"GSM_id":i["GSM_id"]},{"$set":i
            })
        elif i["Biosample_type"]=="Cell line":
            record = db.cell_line.find_one({"GSM":i["GSM_id"]})
            i["title"]=record["TITLE"]
            i['input']=record["INPUT"]
            i['normal'] = ""
            i['normal_input'] = ""
            i['layout'] = record["layout"]
            CEdb.sample_info.update_one({"GSM_id":i["GSM_id"]},{"$set":i
            })
        else:
            print(i)


