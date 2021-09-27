import pymongo
import json
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb

#filepath = "/NAS/luozh/CancerEnhancerDB/all_narrow_peaks/"
def import_peaks(filepath):
    n=0
    files = os.listdir(filepath)
    for file in files:
        file = os.path.basename(file)
        GSM_id = file.split(".")[0].split("_")[1]
        info = db.sample_info.find_one({'GSM_id':GSM_id})
        if not info:
            continue
        if db.donesample.find({"sample_id":info['sample_id']}).count()>0:
            print("the sample " + info['sample_id']+" is done")
            continue
        with open(os.path.join(filepath,file), "r") as reader:
            db[info["sample_id"]].drop()
            header = ["chr", "start", "end", "enhancer_name", "score", "strand", "signalValue", "pValue", "qValue", "peak"]
            for line in reader:
                fields = line.rstrip("\n").split("\t")
                record = dict(zip(header, fields))
                for k in record:
                    if k in ["signalValue", "pValue", "qValue"]:
                        record[k] = float(record[k])
                    if k in ["start", "end", "score", "peak"]:
                        record[k] = int(record[k])
                record["sample_id"] = info["sample_id"]
                record["GSM_id"]=GSM_id
                record["length"] = record["end"] - record["start"]
                record["cancer_type"] = info["cancer_nor"]
                record["cancer_abbr"] = info["cancer_abbr"]
                record["Biosample_type"] = info["Biosample_type"]
                record["enhancer_name"] = info["sample_id"]+"_"+record["enhancer_name"]
                # if db[info["sample_id"]].find_one({"enhancer_name":record["enhancer_name"]}):
                #     print("is done")
                #     continue
                db["peak_"+record["cancer_abbr"]].insert_one(record)
                n=n+1
            print(str(n))
        db.donesample.insert_one({"sample_id":info['sample_id']})


filepath = "/NAS/luozh/CancerEnhancerDB/cell_line_all_narrow_peaks/"
def import_peaks(filepath):
    n=0
    files = os.listdir(filepath)
    for file in files:
        file = os.path.basename(file)
        GSM_id = file.split(".")[0].split("_")[1]
        info = db.sample_info.find_one({'GSM_id':GSM_id})
        if not info:
            continue
        if db.donesample.find({"sample_id":info['sample_id']}).count()>0:
            print("the sample " + info['sample_id']+" is done")
            continue
        with open(os.path.join(filepath,file), "r") as reader:
            db[info["sample_id"]].drop()
            header = ["chr", "start", "end", "enhancer_name", "score", "strand", "signalValue", "pValue", "qValue", "peak"]
            for line in reader:
                fields = line.rstrip("\n").split("\t")
                record = dict(zip(header, fields))
                for k in record:
                    if k in ["signalValue", "pValue", "qValue"]:
                        record[k] = float(record[k])
                    if k in ["start", "end", "score", "peak"]:
                        record[k] = int(record[k])
                record["sample_id"] = info["sample_id"]
                record["GSM_id"]=GSM_id
                record["length"] = record["end"] - record["start"]
                record["cancer_type"] = info["cancer_nor"]
                record["cancer_abbr"] = info["cancer_abbr"]
                record["enhancer_name"] = info["sample_id"]+"_"+record["enhancer_name"]
                # if db[info["sample_id"]].find_one({"enhancer_name":record["enhancer_name"]}):
                #     print("is done")
                #     continue
                db["peak_"+record["cancer_abbr"]].insert_one(record)
                n=n+1
            print(str(n))
        db.donesample.insert_one({"sample_id":info['sample_id']})
#db[info["cancer_id"]].insert(record)

def delenhancer():
    tables = db.sample_info.distinct("sample_id")
    db.donesample.drop()
    for table in tables:
        if table != "super_enhancer" and table != "sample_info":
            db["peak_"+table].drop()


