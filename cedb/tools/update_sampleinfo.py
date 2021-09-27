import pymongo
import json
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb
sra = client.sramongo_new
import pandas as pd

#srr2gsm
def update_info():
df = pd.read_csv("/home/shimw/ChIP-Seq/cell line enhancer summary table_lzh20210628.txt",sep="\t")
dc = dict(zip(df["GSM"],df["CELL_LINE"]))
df = pd.read_csv("/home/shimw/ChIP-Seq/cell line enhancer summary table_lzh20210620.txt",sep="\t")
ss = dict(zip(df["GSM"],df["CELL_LINE"]))
for i in db.sample_info.find():
    if i["Biosample_type"]=="Primary tissue":
        record = sra.srr2gsm.find_one({"GSM":i["GSM_id"]})
        i["title"]=record["TITLE"]
        i['input']=record["INPUT"]
        i['normal'] = record["normal"]
        i['normal_input'] = record["normal_input"]
        i['layout'] = record["layout"]
        i['cell_line'] = ""
        db.sample_info.update_one({"GSM_id":i["GSM_id"]},{"$set":i})
    elif i["Biosample_type"]=="Cell line":
        record = sra.cell_line.find_one({"GSM":i["GSM_id"]})
        i["title"]=record["TITLE"]
        i['input']=record["INPUT"]
        i['normal'] = ""
        i['normal_input'] = ""
        i['layout'] = record["layout"]
        if i["GSM_id"] in dc.keys():
            i['cell_line'] = dc[i["GSM_id"]]
        elif i["GSM_id"] in ss.keys():
            i['cell_line'] = ss[i["GSM_id"]]
        else:
            print(i["GSM_id"])
        db.sample_info.update_one({"GSM_id":i["GSM_id"]},{"$set":i})
    else:
        print(i)


