##cp 下载文件
import pymongo
import json
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb


def download():
    downloaddir = "/home/shimw/web/CEdb-portal/cedb/static/"
    sample_file = open("/home/shimw/web/CEdb-portal/cedb/static/sample_info.csv","w")
    sample_file.write(",".join(["sample_id","GEO_id","GSM_id","Biosample_type","cancer_type","cancer_id","super_enhancer_number","enhancer_number","input","layout","normal","normal_input","cell_line"])+"\n")
    for i in db.sample_info.find():
        GSM_id = i['GSM_id']
        sample_id = i['sample_id']
        sample_file.write(",".join([i['sample_id'],i['GEO_id'],i['GSM_id'],i['Biosample_type'],i['cancer_nor'],i['cancer_id'],str(i['super_enhancer_number']),str(i['enhancer_number']),i['input'],i['layout'],i['normal'],i['normal_input'],i['cell_line']])+"\n")
        #super enhancer
        if i['Biosample_type']=="Cell line":
            continue
        if not os.path.exists(os.path.join(downloaddir,"SE",sample_id+"_superEhancer.txt")):
            with open(os.path.join(downloaddir,"SE",sample_id+"_superEhancer.txt"),'w') as outfile:
                outfile.write("sample_id\tGSM\tGSE\tBiosample_type\tCancer_type\tchr\tstart\tend\tlength\tpeak_score\tgenome annotate\tdetail annotation\tdistance to TSS\tnearest gene name\n")
                for j in db.super_enhancer.find({"GSM_id":GSM_id},{"sample_id": 1, "GSM_id": 1, "GEO_id": 1, "Biosample_type": 1,
                                              "Cancer_type": 1, "chr": 1, "start": 1, "end": 1, "length": 1,"_id": 0, "peak_score": 1,
                                                          "genome_annotate":1,"detail_annotation":1,"distance_to_TSS":1,"nearest_gene_name":1}):
                    s = "\t".join([j["sample_id"],j["GSM_id"],j["GEO_id"],j["Biosample_type"],j["Cancer_type"],
                                   j['chr'],str(j['start']),str(j['end']),str(j['length']),str(j['peak_score']),j['genome_annotate'],j['detail_annotation'],str(j['distance_to_TSS']),j['nearest_gene_name']])
                    outfile.write(s+"\n")
        #broad peak
        # type_option = {"Primary tissue":"cancer","cell line":"cell_line"}
        ff = os.path.join("/NAS/luozh/CancerEnhancerDB/all_broad_peaks/","cancer_"+GSM_id+".macs2_peaks.broadPeak")
        cmd = "cp %s %s" % (ff,os.path.join(downloaddir,"broad_peak",sample_id+".macs2_peaks.broadPeak"))
        os.system(cmd)
        #TF
        tff = os.path.join("/NAS/luozh/CancerEnhancerDB/step3_TF/TF_enriched/","cancer_"+GSM_id,"knownResults.txt")
        cmd = "cp %s %s" % (tff, os.path.join(downloaddir, "TF",sample_id + ".knownResults.txt"))
        os.system(cmd)
    sample_file.close()

def downloadsuper():
    downloaddir = "/home/shimw/web/CEdb-portal/cedb/static/"
    super_file = open("/home/shimw/web/CEdb-portal/cedb/static/super_enhancer.txt","w")
    super_file.write("\t".join(["enhancer_id","sample_id","GSM_id","Biosample_type","Cancer_type","chr","start","end","length","peak_score","genome_annotate","detail_annotation","distance_to_TSS","nearest_gene_name","entrez_id","gene_type","cancer_eQTL_number","GWAS_SNP_number","GTEx_eQTL_number"])+"\n")
    for i in db.super_enhancer.find():
        super_file.write("\t".join([i['enhancer_id'],i['sample_id'],i['GSM_id'],i['Biosample_type'],i['Cancer_type'],i['chr'],str(i['start']),str(i['end']),str(i['length']),str(i['peak_score']),i['genome_annotate'],i['detail_annotation'],str(i['distance_to_TSS']),i['nearest_gene_name'],i['entrez_id'],i['gene_type'],str(i['cancer_eQTL_number']),str(i['GWAS_SNP_number']),str(i['GTEx_eQTL_number'])])+"\n")
    super_file.close()
    
    
    
    
def celldownload():
    downloaddir = "/home/shimw/web/CEdb-portal/cedb/static/"
    for i in db.sample_info.find():
        GSM_id = i['GSM_id']
        sample_id = i['sample_id']
        if i['Biosample_type']=="Primary tissue":
            continue
        if not os.path.exists(os.path.join(downloaddir,"SE",sample_id+"_superEhancer.txt")):
            with open(os.path.join(downloaddir,"SE",sample_id+"_superEhancer.txt"),'w') as outfile:
                outfile.write("sample_id\tGSM\tGSE\tBiosample_type\tCancer_type\tchr\tstart\tend\tlength\tpeak_score\tgenome annotate\tdetail annotation\tdistance to TSS\tnearest gene name\n")
                for j in db.super_enhancer.find({"GSM_id":GSM_id},{"sample_id": 1, "GSM_id": 1, "GEO_id": 1, "Biosample_type": 1,
                                              "Cancer_type": 1, "chr": 1, "start": 1, "end": 1, "length": 1,"_id": 0, "peak_score": 1,
                                                          "genome_annotate":1,"detail_annotation":1,"distance_to_TSS":1,"nearest_gene_name":1}):
                    s = "\t".join([j["sample_id"],j["GSM_id"],j["GEO_id"],j["Biosample_type"],j["Cancer_type"],
                                   j['chr'],str(j['start']),str(j['end']),str(j['length']),str(j['peak_score']),j['genome_annotate'],j['detail_annotation'],str(j['distance_to_TSS']),j['nearest_gene_name']])
                    outfile.write(s+"\n")
        #broad peak
        # type_option = {"Primary tissue":"cancer","cell line":"cell_line"}
        ff = os.path.join("/NAS/luozh/CancerEnhancerDB/cell_line_data/cell_line_all_broad_peaks/","cancer_"+GSM_id+".macs2_peaks.broadPeak")
        cmd = "cp %s %s" % (ff,os.path.join(downloaddir,"broad_peak",sample_id+".macs2_peaks.broadPeak"))
        os.system(cmd)
        #TF
        tff = os.path.join("/opt/luozh/cell_line_TF_enriched/","cancer_"+GSM_id,"knownResults.txt")
        cmd = "cp %s %s" % (tff, os.path.join(downloaddir, "TF",sample_id + ".knownResults.txt"))
        os.system(cmd)
    sample_file.close()



