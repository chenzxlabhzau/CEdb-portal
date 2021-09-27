import pymongo
import json
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb

dirpath = "/NAS/luozh/CancerEnhancerDB/step3_TF/TF_enriched/"

def import_tf(dirpath):
    db.TF.drop()
    files = os.listdir(dirpath)
    for file in files:
        file = os.path.basename(file)
        GSM_id = file.split("_")[1]
        tffile = os.path.join("/NAS/luozh/CancerEnhancerDB/step3_TF/TF_enriched/" , file ,"knownResults.txt")
        info = db.sample_info.find_one({'GSM_id': GSM_id})
        if not info:
            continue
        with open(tffile, "r") as reader:
            header = reader.readline().strip().split('\t')
            header = ['motif_name','Consensus','pvalue','Logp','qvalue',
                      'length_target','percent_target',"length_background",'percent_background']
            n=1
            for line in reader:
                fields = line.rstrip("\n").split("\t")
                record = dict(zip(header, fields))
                if float(record['pvalue'])>=0.05:
                    break
                motif_svg_file = os.path.join("/NAS/luozh/CancerEnhancerDB/step3_TF/TF_enriched/" ,
                                         file ,"knownResults","known"+str(n)+".logo.svg")
                f = open(motif_svg_file,"r")
                motif_svg = f.read()
                f.close()
                record['motif_svg'] = motif_svg
                record["sample_id"] = info['sample_id']
                record["Biosample_type"] = info["Biosample_type"]
                record["cancer_nor"] = info["cancer_nor"]
                record["cancer_abbr"] = info["cancer_abbr"]
                record["GSM_id"] = info["GSM_id"]
                record['motif_name'] = record['motif_name'].split("/")[0].replace("("," (")
                n=n+1
                for k in record:
                    if k in ["pvalue","Logp","qvalue","length_target","length_background"]:
                        record[k] = float(record[k])
                print("one insert")
                db.TF.insert_one(record)
                


celldirpath = "/opt/luozh/cell_line_TF_enriched"
def import_cell_tf(celldirpath):
    files = os.listdir(celldirpath)
    for file in files:
        file = os.path.basename(file)
        GSM_id = file.split("_")[1]
        tffile = os.path.join("/opt/luozh/cell_line_TF_enriched/" , file ,"knownResults.txt")
        info = db.sample_info.find_one({'GSM_id': GSM_id})
        if not info:
            continue
        with open(tffile, "r") as reader:
            header = reader.readline().strip().split('\t')
            header = ['motif_name','Consensus','pvalue','Logp','qvalue',
                      'length_target','percent_target',"length_background",'percent_background']
            n=1
            for line in reader:
                fields = line.rstrip("\n").split("\t")
                record = dict(zip(header, fields))
                if float(record['pvalue'])>=0.05:
                    break
                motif_svg_file = os.path.join("/opt/luozh/cell_line_TF_enriched/" ,
                                         file ,"knownResults","known"+str(n)+".logo.svg")
                f = open(motif_svg_file,"r")
                motif_svg = f.read()
                f.close()
                record['motif_svg'] = motif_svg
                record["sample_id"] = info['sample_id']
                record["Biosample_type"] = info["Biosample_type"]
                record["cancer_nor"] = info["cancer_nor"]
                record["cancer_abbr"] = info["cancer_abbr"]
                record["GSM_id"] = info["GSM_id"]
                record['motif_name'] = record['motif_name'].split("/")[0].replace("("," (")
                n=n+1
                for k in record:
                    if k in ["pvalue","Logp","qvalue","length_target","length_background"]:
                        record[k] = float(record[k])
                print("one insert")
                db.TF.insert_one(record)

db.TF.create_index([("motif_name",1)])