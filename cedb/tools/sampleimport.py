import pymongo
import json
import pandas as pd
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb


cell_abbr = pd.read_csv("/NAS/luozh/CancerEnhancerDB/step7_help/cell_line_phenotype.txt", sep="\t", header=None, names=['a', 'b','c',"d","e","f"])
cell_abbr = cell_abbr[["a", "f"]]
primary_abbr = pd.read_csv("/NAS/luozh/CancerEnhancerDB/step7_help/phenotype.txt", sep="\t", header=None, names=['a', 'b','c',"d","e","f"])
primary_abbr = primary_abbr[["a", "f"]]

cancer_abbr = primary_abbr.append(cell_abbr)
cancer_abbr = cancer_abbr.drop_duplicates()
abbr_anno = cancer_abbr.set_index(['c'])['f'].to_dict()

#filepath="/NAS/luozh/CancerEnhancerDB/step1_data/all_sample_info.csv"
#db.sample_info.remove({})

def import_sample_info(filepath):
    with open(filepath, "r") as reader:
        header = reader.readline().strip().split(',')
        for line in reader:
            fields = line.rstrip("\n").split(",")
            record = dict(zip(header, fields))
            for k in record:
                if k in ["super_enhancer_number"]:
                    record[k] = float(record[k])
            record["sample_id"] = abbr_anno[record['Cancer_type']]+"_"+str(db.sample_info.find({"cancer_abbr":abbr_anno[record['Cancer_type']]}).count()+1)
            record["cancer_abbr"] = abbr_anno[record['Cancer_type']]
            db.sample_info.insert_one(record)


#cell_line_file="/NAS/luozh/CancerEnhancerDB/cell_line_data/cell_line_all_sample_info.csv"
def import_cell_info(cell_line_file):
    db.sample_info.remove({"Biosample_type":"Cell line"})
    with open(cell_line_file, "r") as reader:
        header = reader.readline().strip().split(',')
        for line in reader:
            fields = line.rstrip("\n").split(",")
            record = dict(zip(header, fields))
            for k in record:
                if k in ["super_enhancer_number"]:
                    record[k] = float(record[k])
            record["sample_id"] = abbr_anno[record['Cancer_type']] + "_" + str(
                db.sample_info.find({"cancer_abbr": abbr_anno[record['Cancer_type']]}).count() + 1)
            record["cancer_abbr"] = abbr_anno[record['Cancer_type']]
            db.sample_info.insert_one(record)

##有部分样本的input等GSM不是空字符，而是no，所以更新
def update_no():
    for i in db.sample_info.find({"input":"no"}):
        i["input"]=""
        db.sample_info.update_one({"GSM_id":i["GSM_id"]},{"$set":i
        })
    for i in db.sample_info.find({"normal":"no"}):
        i["normal"]=""
        db.sample_info.update_one({"GSM_id":i["GSM_id"]},{"$set":i
        })
    for i in db.sample_info.find({"normal_input":"no"}):
        i["normal_input"]=""
        db.sample_info.update_one({"GSM_id":i["GSM_id"]},{"$set":i
        })

##



if __name__ =="__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("inputfile", help="the input file you give,must be csv file", type=str)
    args = parser.parse_args()
    inputfile = args.inputfile
    if "sample_info" in inputfile:
        import_sample_info(inputfile)