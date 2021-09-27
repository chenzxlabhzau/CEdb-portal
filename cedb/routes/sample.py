from flask import Blueprint, render_template
from cedb.db import mongo
from urllib.parse import unquote





from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal



sample = Blueprint("sample", __name__)

api = Api(sample)


BasicInfo_fields = {
    "sample_id": fields.String,
    "GEO_id": fields.String,
    "GSM_id": fields.String,
    "Biosample_type":fields.String,
    "cancer_nor":fields.String,
    "cancer_id":fields.String,
    "input":fields.String,
    "normal":fields.String,
    "normal_input":fields.String,
    "super_enhancer_number":fields.Integer,
    "layout":fields.String,
    "cell_line":fields.String
}
Pie_fields = {
    "chr":fields.String,
    "value":fields.Float
}

super_fields = {
    "result":fields.Nested(
        {
            "GSM_id": fields.String,
            "enhancer_id": fields.String,
            "chr": fields.String,
            "start":fields.String,
            "end":fields.Integer,
            "length":fields.Integer,
            "genome_annotate":fields.String,
            "detail_annotation":fields.String,
            "distance_to_TSS":fields.String,
            "nearest_gene_name":fields.String,
            "GWAS_SNP_number":fields.Integer,
            "GTEx_eQTL_number":fields.Integer,
            "cancer_eQTL_number":fields.Integer,
        }
    ),
    "count":fields.Integer
}

typical_fields = {
    "result":fields.Nested(
        {
            "enhancer_name": fields.String,
            "chr": fields.String,
            "start":fields.String,
            "end":fields.Integer,
            "length":fields.Integer,
            "score":fields.Float,
            "pValue":fields.Float
        }
    ),
    "count":fields.Integer
}

tf_fields = {
    "result":fields.Nested(
        {
            "motif_name": fields.String,
            "pvalue": fields.Float,
            "length_target":fields.Float,
            "percent_target":fields.String,
            "length_background":fields.Float,
            "percent_background":fields.String,
            "motif_svg":fields.String
        }
    ),
    "count":fields.Integer
}




class BasicInfo(Resource):
    @marshal_with(BasicInfo_fields)
    def get(self,sample_id):
        result = mongo.db.sample_info.find_one({"sample_id": sample_id}, {"_id": 0,"super_enhancer_distribution": 0,"typical_enhancer_distribution": 0})
        return result
api.add_resource(BasicInfo, "/basic/<string:sample_id>")

class PieTypical(Resource):
    @marshal_with(Pie_fields)
    def get(self,sample_id):
        result = mongo.db.sample_info.find_one({"sample_id": sample_id}, {"_id": 0})
        return result['typical_enhancer_distribution']
api.add_resource(PieTypical, "/pietypical/<string:sample_id>")

class PieSuper(Resource):
    @marshal_with(Pie_fields)
    def get(self,sample_id):
        result = mongo.db.sample_info.find_one({"sample_id": sample_id}, {"_id": 0})
        return result["super_enhancer_distribution"]
api.add_resource(PieSuper, "/piesuper/<string:sample_id>")


class Super(Resource):
    @marshal_with(super_fields)
    def get(self):
        parser =  reqparse.RequestParser()
        parser.add_argument("sample_id", type=str)
        parser.add_argument("query", type=str)
        parser.add_argument("sortcol", type=str)
        parser.add_argument("sort", type=str)
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=10)
        args = parser.parse_args()
        sort_option = {"asc": 1, "desc": -1}
        record_skip = args["page"] * args["size"]
        record_limit = args["size"]
        condition = {}
        if args.query != "":
            condition["cancer_nor"]={"$regex": args.query, "$options": "i"}
        condition["sample_id"] = args["sample_id"]
        if args['sort']!="no" and args['sort']!="":
            if args['sortcol']=="loci":
                result = mongo.db.super_enhancer.find(condition,{"_id":0}).sort([("chr",sort_option[args.sort]),("start",sort_option[args.sort])]).skip(record_skip).limit(record_limit)
            else:
                result = mongo.db.super_enhancer.find(condition,{"_id":0}).sort(args["sortcol"],sort_option[args.sort]).skip(record_skip).limit(record_limit)
        else:
            print("super")
            result = mongo.db.super_enhancer.find(condition,{"_id":0}).skip(record_skip).limit(record_limit)
        count = result.count()
        print(condition)
        print("ok")
        return {"result":list(result),"count":count}
api.add_resource(Super, "/super")

class Typical(Resource):
    @marshal_with(typical_fields)
    def get(self):
        parser =  reqparse.RequestParser()
        parser.add_argument("sample_id", type=str)
        parser.add_argument("query", type=str)
        parser.add_argument("sortcol", type=str)
        parser.add_argument("sort", type=str)
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=10)
        args = parser.parse_args()
        sort_option = {"asc": 1, "desc": -1}
        record_skip = args["page"] * args["size"]
        record_limit = args["size"]
        condition = {}
        if args.query != "":
            condition["chr"]={"$regex": args.query, "$options": "i"}
        if args['sort']!="no" and args['sort']!="":
            if args['sortcol']=="loci":
                result = mongo.db[args["sample_id"]].find(condition).sort([("chr",sort_option[args.sort]),("start",sort_option[args.sort])]).skip(record_skip).limit(record_limit)
            else:
                result = mongo.db[args["sample_id"]].find(condition).sort(args["sortcol"],sort_option[args.sort]).skip(record_skip).limit(record_limit)
        else:
            result = mongo.db[args["sample_id"]].find(condition).skip(record_skip).limit(record_limit)
        count = result.count()
        print(condition)
        return {"result":list(result),"count":count}
api.add_resource(Typical, "/typical")


class TF(Resource):
    @marshal_with(tf_fields)
    def get(self):
        parser =  reqparse.RequestParser()
        parser.add_argument("sample_id", type=str)
        parser.add_argument("query", type=str)
        parser.add_argument("sortcol", type=str)
        parser.add_argument("sort", type=str)
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=10)
        args = parser.parse_args()
        sort_option = {"asc": 1, "desc": -1}
        record_skip = args["page"] * args["size"]
        record_limit = args["size"]
        condition = {}
        condition["sample_id"] = args["sample_id"]
        if args.query != "":
            condition["motif_name"]={"$regex": unquote(args.query).replace("(","\\(").replace(")","\\)"), "$options": "i"}
        if args['sort']!="no" and args['sort']!="":
            result = mongo.db.TF.find(condition,{"_id":0}).sort(args["sortcol"],sort_option[args.sort]).skip(record_skip).limit(record_limit)
        else:
            result = mongo.db.TF.find(condition,{"_id":0}).skip(record_skip).limit(record_limit)
        count = result.count()
        print(condition)
        return {"result":list(result),"count":count}
api.add_resource(TF, "/tf")