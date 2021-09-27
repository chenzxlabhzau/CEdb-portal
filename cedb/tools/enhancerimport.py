import pymongo
import json
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb


#super_filepath="/NAS/luozh/CancerEnhancerDB/step1_data/super_enhancer_annotate_peak_remove_chrM_add_gwas_gtex_cancer_snp.csv"
def import_super_enhancers(super_filepath):
    db.super_enhancer.remove({"Biosample_type":"Primary tissue"})
    with open(super_filepath, "r") as reader:
        header = reader.readline().strip().split('\t')
        header[0] = 'PeakID'
        for line in reader:
            fields = line.rstrip("\n").split("\t")
            record = dict(zip(header, fields))
            record_new = {}
            sample_id = record["PeakID"].split("_")[0]+"_"+record["PeakID"].split("_")[1]
            r = db.sample_info.find_one({"sample_id":sample_id})
            record_new["enhancer_id"] = record['PeakID']
            record_new["sample_id"] = sample_id
            record_new["GSM_id"]=r['GSM_id']
            record_new["GEO_id"] = r["GEO_id"]
            record_new["Biosample_type"] = r['Biosample_type']
            record_new["cell_line"] = ""
            record_new["Cancer_type"] = r["cancer_nor"]
            record_new["cancer_abbr"] = r["cancer_abbr"]
            record_new["chr"] = record["Chr"]
            record_new["start"] = int(record["Start"])
            record_new["end"] = int(record["End"])
            record_new["length"] = record_new["end"]-record_new["start"]
            record_new['peak_score'] = float(record['Peak Score'])
            record_new["genome_annotate"] = record["Annotation"]
            record_new["detail_annotation"] = record["Detailed Annotation"]
            record_new["distance_to_TSS"] = int(record["Distance to TSS"])
            record_new["nearest_gene_name"] = record["Gene Name"]
            record_new["entrez_id"] = record["Entrez ID"][:-2]
            record_new["gene_description"] = record["Gene Description"]
            record_new["gene_type"] = record["Gene Type"]
            record_new["cancer_eQTL_number"] = int(record['Cancer_eQTL_numer'])
            rs_ce = record['Cancer_eQTL_rsid'].split(",")
            record_new["GWAS_SNP_number"] = int(record['GWAS_SNP_numer'])
            rs_gs = record['GWAS_SNP_rsid'].split(",")
            record_new["GTEx_eQTL_number"] = int(record['GTEx_eQTL_numer'])
            rs_ge = record['GTEx_eQTL_rsid'].split(",")
            if rs_ce[0]=="":
                rs_ce = []
            if rs_gs[0]=="":
                rs_gs = []
            if rs_ge[0]=="":
                rs_ge = []
            record_new["cancer_eQTL_rsid"] = rs_ce
            record_new["GWAS_SNP_rsid"] = rs_gs
            record_new["GTEx_eQTL_rsid"] = rs_ge
            db.super_enhancer.insert_one(record_new)


#super_cell_filepath="/NAS/luozh/CancerEnhancerDB/cell_line_data/cell_line_super_enhancer_annotate_peak_remove_chrM_add_gwas_gtex_cancer_snp.csv"
def import_cell_super_enhancers(super_cell_filepath):
    with open(super_cell_filepath, "r") as reader:
        db.super_enhancer.remove({"Biosample_type":"Cell line"})
        header = reader.readline().strip().split('\t')
        header[0] = 'PeakID'
        for line in reader:
            fields = line.rstrip("\n").split("\t")
            record = dict(zip(header, fields))
            record_new = {}
            sample_id = record["PeakID"].split("_")[0]+"_"+record["PeakID"].split("_")[1]
            r = db.sample_info.find_one({"sample_id":sample_id})
            record_new["enhancer_id"] = record['PeakID']
            record_new["sample_id"] = sample_id
            record_new["GSM_id"]=r['GSM_id']
            record_new["GEO_id"] = r["GEO_id"]
            record_new["Biosample_type"] = r['Biosample_type']
            record_new["cell_line"] = r["cell_line"]
            record_new["Cancer_type"] = r["cancer_nor"]
            record_new["cancer_abbr"] = r["cancer_abbr"]
            record_new["chr"] = record["Chr"]
            record_new["start"] = int(record["Start"])
            record_new["end"] = int(record["End"])
            record_new["length"] = record_new["end"]-record_new["start"]
            record_new['peak_score'] = float(record['Peak Score'])
            record_new["genome_annotate"] = record["Annotation"]
            record_new["detail_annotation"] = record["Detailed Annotation"]
            record_new["distance_to_TSS"] = int(record["Distance to TSS"])
            record_new["nearest_gene_name"] = record["Gene Name"]
            record_new["entrez_id"] = record["Entrez ID"][:-2]
            record_new["gene_description"] = record["Gene Description"]
            record_new["gene_type"] = record["Gene Type"]
            record_new["cancer_eQTL_number"] = int(record['Cancer_eQTL_numer'])
            rs_ce = record['Cancer_eQTL_rsid'].split(",")
            record_new["GWAS_SNP_number"] = int(record['GWAS_SNP_numer'])
            rs_gs = record['GWAS_SNP_rsid'].split(",")
            record_new["GTEx_eQTL_number"] = int(record['GTEx_eQTL_numer'])
            rs_ge = record['GTEx_eQTL_rsid'].split(",")
            if rs_ce[0]=="":
                rs_ce = []
            if rs_gs[0]=="":
                rs_gs = []
            if rs_ge[0]=="":
                rs_ge = []
            record_new["cancer_eQTL_rsid"] = rs_ce
            record_new["GWAS_SNP_rsid"] = rs_gs
            record_new["GTEx_eQTL_rsid"] = rs_ge
            db.super_enhancer.insert_one(record_new)




if __name__ =="__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("inputfile", help="the input file you give,must be csv file", type=str)
    args = parser.parse_args()
    inputfile = args.inputfile
    if "super_enhancer" in inputfile:
        import_super_enhancers(inputfile)
