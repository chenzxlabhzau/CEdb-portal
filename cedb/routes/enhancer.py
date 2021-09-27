from flask import Blueprint, render_template
from cedb.db import mongo

from werkzeug.wrappers import AuthorizationMixin
import sys

from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal



enhancer = Blueprint("enhancer", __name__)

api = Api(enhancer)

enhancer_basicinfo_fields = {
    "sample_id": fields.String,
    "GEO_id": fields.String,
    "GSM_id": fields.String,
    "enhancer_id": fields.String,
    "Biosample_type": fields.String,
    "peak_score": fields.String,
    "Cancer_type": fields.String,
    "chr": fields.String,
    "start": fields.Integer,
    "end": fields.Integer,
    "length": fields.Integer,
    "genome_annotate": fields.String,
    "detail_annotation": fields.String,
    "distance_to_TSS": fields.Integer,
    "nearest_gene_name": fields.String,
    "entrez_id": fields.String,
    "gene_description": fields.String,
    "GWAS_SNP_number": fields.Integer,
    "GTEx_eQTL_number": fields.Integer,
    "cancer_eQTL_number": fields.Integer
}


eqtl_fields = {
    "result":fields.Nested(
        {
            "chr": fields.String,
            "start": fields.Integer,
            "end": fields.Integer,
            "gene": fields.String,
            "rsid": fields.String,
            "fdr": fields.Float,
            "phenotype": fields.String
        }
    ),
    "count":fields.Integer
}


class BasicInfo(Resource):
    @marshal_with(enhancer_basicinfo_fields)
    def get(self,enhancer_id):
        result = mongo.db.super_enhancer.find_one({"enhancer_id": enhancer_id}, {"_id": 0,"cancer_eQTL_rsid":0})
        return result
api.add_resource(BasicInfo, "/basic/<string:enhancer_id>")


class eQTL(Resource):
    @marshal_with(eqtl_fields)
    def get(self):
        parser =  reqparse.RequestParser()
        parser.add_argument("enhancer_id", type=str)
        parser.add_argument("eqtlType", type=str)
        parser.add_argument("sortcol", type=str)
        parser.add_argument("sort", type=str)
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=10)
        args = parser.parse_args()
        sort_option = {"asc": 1, "desc": -1}
        #type_option = {"eqtl_cancer":"cancer_eQTL_rsid","eqtl_gwas":"GWAS_eQTL_rsid"}
        type_option = {"eqtl_cancer": "cancer_eQTL_rsid", "eqtl_gwas": "GWAS_SNP_rsid", "eqtl_gtex": "GTEx_eQTL_rsid"}
        record_skip = args["page"] * args["size"]
        record_limit = args["size"]
        condition = {}
        #r = mongo.db.super_enhancer.find_one({"enhancer_id":args['enhancer_id']},{"enhancer_id":1,"chr":1,"cancer_eQTL_rsid":1,"GWAS_eQTL_rsid":1})
        r = mongo.db.super_enhancer.find_one({"enhancer_id": args['enhancer_id']},
                                             {"enhancer_id": 1, "chr": 1, "cancer_eQTL_rsid": 1
                                              , "GWAS_SNP_rsid": 1, "GTEx_eQTL_rsid": 1})
        d = args['eqtlType'] + "_" + r['chr']
        if len(r[type_option[args["eqtlType"]]])==0:
            return
        condition['rsid'] = {"$in":r[type_option[args["eqtlType"]]]}
        if args['eqtlType']=="eqtl_gtex":
            pipeline = [ {'$match':condition},
                         {'$unwind':'$tissue'},
                         {'$skip': record_skip},
                         {'$limit':record_limit}
                         ]
            if args['sort'] != "no" and args['sort'] != "":
                if args['sortcol'] == "loci":
                    pipeline.append({{"$sort":{"start":sort_option[args.sort]}}})
                else:
                    pipeline.append({"$sort": {'tissue.fdr': sort_option[args.sort]}})
            result_tmp = mongo.db[d].aggregate(pipeline)
            c = mongo.db[d].aggregate([ {'$match':condition},
                         {'$unwind':'$tissue'},
                         {"$count": "totalCount"}
                         ])
            count = list(c)[0]['totalCount']
            result = []
            for rr in result_tmp:
                r_tmp = {}
                r_tmp['chr'] = rr['chr']
                r_tmp['start'] = rr['start']
                r_tmp['end'] = rr['end']
                r_tmp['rsid'] = rr['rsid']
                r_tmp['gene'] = rr["tissue"]['gene']
                r_tmp['fdr'] = rr["tissue"]['fdr']
                r_tmp['phenotype'] = rr["tissue"]['phenotype']
                result.append(r_tmp)
            return {"result":result,"count":count}
        if args['sort']!="no" and args['sort']!="":
            if args['sortcol']=="loci":
                result = mongo.db[d].find(condition,{"_id":0}).sort("start",sort_option[args.sort]).skip(record_skip).limit(record_limit)
            else:
                result = mongo.db[d].find(condition,{"_id":0}).sort(args["sortcol"],sort_option[args.sort]).skip(record_skip).limit(record_limit)
        else:
            print(condition)
            result = mongo.db[d].find(condition,{"_id":0}).skip(record_skip).limit(record_limit)
        count = result.count()
        print(condition)
        print(d)
        print("ok")
        return {"result":list(result),"count":count}
api.add_resource(eQTL, "/eqtl")