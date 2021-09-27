from flask import Blueprint, render_template
from cedb.db import mongo

from werkzeug.wrappers import AuthorizationMixin
import sys




from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal

from flask import Flask, render_template, redirect, json, url_for, jsonify, request
import pandas as pd
from random import choice


search = Blueprint("search", __name__)

api = Api(search)

super_fields = {
    "result":fields.Nested(
        {   "sample_id": fields.String,
            "enhancer_id": fields.String,
            "chr": fields.String,
            "start":fields.Integer,
            "end":fields.Integer,
            "length":fields.String,
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


class Super(Resource):
    @marshal_with(super_fields)
    def get(self):
        parser =  reqparse.RequestParser()
        parser.add_argument("cancer_type", type=str)
        parser.add_argument("source_type", type=str)
        parser.add_argument("query", type=str)
        parser.add_argument("chr", type=str)
        parser.add_argument("start")
        parser.add_argument("end")
        parser.add_argument("sortcol", type=str)
        parser.add_argument("sort", type=str)
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=10)
        args = parser.parse_args()
        sort_option = {"asc": 1, "desc": -1}
        record_skip = args["page"] * args["size"]
        record_limit = args["size"]
        condition = {}
        if args["query"]!="undefined" and args["query"]!="null":
            condition["nearest_gene_name"]= {"$regex": args["query"], "$options": "i"}
        if args["chr"] != "undefined":
            condition["chr"] = args["chr"]
        if args["start"] != "null" and args["start"] != "undefined":
            condition["start"] = {"$gte":int(args["start"])}
        if args["end"] != "null" and args["end"] != "undefined":
            condition["end"] = {"$lte": int(args["end"])}
        if args["source_type"] != "undefined":
            condition['Biosample_type'] = args["source_type"]
        if args["cancer_type"] != "undefined":
            condition['Cancer_type'] = args["cancer_type"]
        if args['sort']!="no" and args['sort']!="":
            if args['sortcol']=="loci":
                result = mongo.db.super_enhancer.find(condition,{"_id":0,"cancer_eQTL_rsid":0,"gene_description":0}).sort([("chr",sort_option[args.sort]),("start",sort_option[args.sort])]).skip(record_skip).limit(record_limit)
            else:
                result = mongo.db.super_enhancer.find(condition,{"_id":0,"cancer_eQTL_rsid":0,"gene_description":0}).sort(args["sortcol"],sort_option[args.sort]).skip(record_skip).limit(record_limit)
        else:
            result = mongo.db.super_enhancer.find(condition,{"_id":0,"cancer_eQTL_rsid":0,"gene_description":0}).skip(record_skip).limit(record_limit)
        count = result.count()
        print(condition)
        return {"result":list(result),"count":count}
api.add_resource(Super, "/super")


typical_fields = {
    "result":fields.Nested(
        {   "enhancer_name": fields.String,
            "sample_id": fields.String,
            "chr": fields.String,
            "start":fields.Integer,
            "end":fields.Integer,
            "length":fields.Integer,
            "score":fields.Integer,
            "signalValue":fields.Float,
            "cancer_abbr":fields.String
        }
    ),
    "count":fields.Integer
}
class Typical(Resource):
    @marshal_with(typical_fields)
    def get(self):
        parser =  reqparse.RequestParser()
        parser.add_argument("cancer_type", type=str)
        parser.add_argument("source_type", type=str)
        parser.add_argument("query", type=str)
        parser.add_argument("chr", type=str)
        parser.add_argument("start")
        parser.add_argument("end")
        parser.add_argument("sortcol", type=str)
        parser.add_argument("sort", type=str)
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=10)
        args = parser.parse_args()
        sort_option = {"asc": 1, "desc": -1}
        record_skip = args["page"] * args["size"]
        record_limit = args["size"]
        condition = {}
        if args["query"]!="undefined" and args["query"]!="null":
            condition["nearest_gene_name"]= {"$regex": args["query"], "$options": "i"}
        if args["chr"] != "undefined":
            condition["chr"] = args["chr"]
        if args["start"] != "null" and args["start"] != "undefined":
            condition["start"] = {"$gte":int(args["start"])}
        if args["end"] != "null" and args["end"] != "undefined":
            condition["end"] = {"$lte": int(args["end"])}
        if args["source_type"] != "undefined":
            condition['Biosample_type'] = args["source_type"]
        if args['sort']!="no" and args['sort']!="":
            result = mongo.db["peak_"+args["cancer_type"]].find(condition,{"_id":0}).sort(args["sortcol"],sort_option[args.sort]).skip(record_skip).limit(record_limit)
        else:
            result = mongo.db["peak_"+args["cancer_type"]].find(condition,{"_id":0}).skip(record_skip).limit(record_limit)
        count = result.count()
        print(condition)
        return {"result":list(result),"count":count}
api.add_resource(Typical, "/typical")



tf_stat_fields = {
    "result":fields.Nested(
        {   "motif_name": fields.String,
            "cancer_abbr": fields.String,
            "cancer_num": fields.Integer,
            "cancer_tf_sum":fields.Integer,
            "primary_num":fields.Integer,
            "cell_num":fields.Integer,
            "all_cancer_num":fields.Integer,
            "oddsr":fields.Float,
            "pvalue":fields.Float
        }
    ),
    "count":fields.Integer
}

class tfstat(Resource):
    @marshal_with(tf_stat_fields)
    def get(self):
        parser =  reqparse.RequestParser()
        parser.add_argument("cancer_type", type=str)
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
        if args["query"]!="undefined" and args["query"]!="null" :
            condition["motif_name"]= {"$regex": args["query"], "$options": "i"}
        if args["cancer_type"] != "undefined":
            condition['cancer_abbr'] = args["cancer_type"]
        if args['sort']!="no" and args['sort']!="":
            result = mongo.db.TF_stat.find(condition,{"_id":0}).sort(args["sortcol"],sort_option[args.sort]).skip(record_skip).limit(record_limit)
        else:
            result = mongo.db.TF_stat.find(condition,{"_id":0}).skip(record_skip).limit(record_limit)
        count = result.count()
        print(condition)
        return {"result": list(result),"count": count}
api.add_resource(tfstat, "/tfstat")