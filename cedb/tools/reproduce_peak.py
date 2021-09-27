import pymongo
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb
###导入重复的peak统计

"/home/shimw/project/enhancer_map/id2symbol.csv"
reproduce_filepath="/NAS/luozh/CancerEnhancerDB/step6_peak_figure/narrow_reproduced_annotated_peak_rename/"

with open("/home/shimw/project/enhancer_map/id2symbol.csv", "r") as r:
    header = r.readline()
    id2symbol = {}
    for line in r:
        line = line.strip().split(",")
        id2symbol[line[0]]=line[1]

def reproduce_peak_import(reproduce_filepath, source, datatype):
    for file in os.listdir(reproduce_filepath):
        with open(os.path.join(reproduce_filepath,file), "r") as reader:
            cancer_type = file.split("_")[0]
            if source=="Primary tissue":
                sample_number = db.sample_info.find({"cancer_abbr":cancer_type,"Biosample_type":"Primary tissue"}).count()
            elif source=="Cell line":
                sample_number = db.sample_info.find({"cancer_abbr": cancer_type, "Biosample_type": "Cell line"}).count()
            else:
                print("source is error")
                continue
            header = reader.readline().strip().split('\t')
            for line in reader:
                fields = line.rstrip("\n").split("\t")
                record = dict(zip(header, fields))
                record["nearest_gene"] = id2symbol[record['nearest_ensembl']] if id2symbol[record['nearest_ensembl']]!="" else record['nearest_ensembl']
                del record['nearest_ensembl']
                del record['peak_name']
                del record['signalValue']
                del record['pValue']
                del record['qValue']
                for k in record:
                    if k in ["start", 'end', 'sample_coverage']:
                        record[k] = int(record[k])
                record['score'] = float(record['score'])
                record["sample_number"] = sample_number
                record["datatype"] = datatype
                record["Biosample_type"] = source
                db["stat_" + cancer_type].insert_one(record)

"typical"
"super"
reproduce_peak_import("/NAS/luozh/CancerEnhancerDB/step6_peak_figure/narrow_reproduced_annotated_peak_rename/",
                      "Primary tissue",
                      "Typical enhancer")
reproduce_peak_import("/NAS/luozh/CancerEnhancerDB/step6_peak_figure/cell_line_narrow_reproduced_annotated_peak_rename/",
                      "Cell line",
                      "Typical enhancer")

table=""
def delenhancer():
    tables = db.collection_names()
    for table in tables:
        if table != "super_enhancer" and table != "sample_info":
            table=""
            if table.startswith("stat_"):
                db[table].drop()



