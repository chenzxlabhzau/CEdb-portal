import pymongo
import json
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb

#eqtl_filepath="/NAS/luozh/CancerEnhancerDB/step1_data/cancer_eQTL_total.bed"
def import_cancer_eqtl_enhancers(eqtl_filepath):
    with open(eqtl_filepath, "r") as reader:
        header = ["chr", "start", "end", "gene", "rsid", "fdr", "phenotype"]
        for line in reader:
            fields = line.rstrip("\n").split("\t")
            record = dict(zip(header, fields))
            for k in record:
                if k in ["fdr"]:
                    record[k] = float(record[k])
            for k in record:
                if k in ["start","end"]:
                    record[k] = int(record[k])
            d = "eqtl_cancer_"+record["chr"]
            db[d].insert_one(record)

#gwas_filepath="/NAS/luozh/CancerEnhancerDB/step1_data/gwas_snp.bed"
def import_GWAS_snp_enhancers(gwas_filepath):
    with open(gwas_filepath, "r") as reader:
        header = ["chr", "start", "end", "gene", "rsid", "phenotype","region", "fdr","pubmed_id"]
        for line in reader:
            fields = line.rstrip("\n").split("\t")
            record = dict(zip(header, fields))
            for k in record:
                if k in ["fdr"]:
                    record[k] = float(record[k])
            for k in record:
                if k in ["start","end"]:
                    record[k] = int(record[k])
            d = "eqtl_gwas_"+record["chr"]
            db[d].insert_one(record)


#gtex_filepath="/NAS/luozh/CancerEnhancerDB/step1_data/primary_tissue_used_gtex_snp_unique_redundent.txt"
def import_gtex_eqtl_enhancers(gtex_filepath):
    with open(gtex_filepath, "r") as reader:
        header = ["chr", "start", "end", "rsid", "tissue"]
        for line in reader:
            fields = line.rstrip("\n").split(":")
            record = dict(zip(header, fields))
            tissue_str = record["tissue"].split(",")
            h = ["gene", "fdr", "phenotype"]
            nn = []
            for i in tissue_str:
                aa = dict(zip(h, i.split("\t")))
                aa["fdr"]=float(aa["fdr"])
                nn.append(aa)
            record["tissue"] = nn
            for k in record:
                if k in ["start","end"]:
                    record[k] = int(record[k])
            d = "eqtl_gtex_"+record["chr"]
            db[d].insert_one(record)


#gtex_filepath="/NAS/luozh/CancerEnhancerDB/step1_data/primary_tissue_used_gtex_snp_unique_redundent.txt"
#gtex_cell_filepath="/NAS/luozh/CancerEnhancerDB/cell_line_data/cell_line_used_gtex_snp_unique_redundent.txt"
def import_cell_line_gtex_eqtl_enhancers(gtex_filepath,gtex_cell_filepath):
    with open(gtex_cell_filepath, "r") as reader_new:
        new = []
        for line in reader_new:
            new.append(line.rstrip("\n").split(":")[3])
    old = []
    for table in db.list_collection_names():
        if table.startswith("eqtl_gtex_"):
            old = old+db[table].distinct('rsid')
    retD = list(set(new).difference(set(old)))
    with open(gtex_cell_filepath, "r") as reader:
        header = ["chr", "start", "end", "rsid", "tissue"]
        for line in reader:
            fields = line.rstrip("\n").split(":")
            record = dict(zip(header, fields))
            if record['rsid'] in retD:
                d = "eqtl_gtex_"+record["chr"]
                if db[d].find_one({"rsid":record["rsid"]}):
                    print("is ok")
                    continue
                tissue_str = record["tissue"].split(",")
                h = ["gene", "fdr", "phenotype"]
                nn = []
                for i in tissue_str:
                    aa = dict(zip(h, i.split("\t")))
                    aa["fdr"]=float(aa["fdr"])
                    nn.append(aa)
                record["tissue"] = nn
                for k in record:
                    if k in ["start","end"]:
                        record[k] = int(record[k])
                d = "eqtl_gtex_"+record["chr"]
                db[d].insert_one(record)





def deleeqtl():
    for table in db.list_collection_names():
        if table.startswith("eqtl_gtex_"):
            if table != "super_enhancer" and table != "sample_info":
                db[table].drop()
                print(table)



if __name__ =="__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("inputfile", help="the input file you give,must be csv file", type=str)
    args = parser.parse_args()
    inputfile = args.inputfile
    import_cancer_eqtl_enhancers(inputfile)