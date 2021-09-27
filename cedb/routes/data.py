from flask import Blueprint, render_template
from cedb.db import mongo

import sys




from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal



data = Blueprint("data", __name__)

api = Api(data)

sample_fields = {
    "result":fields.Nested(
        {
            "GEO_id": fields.String,
            "GSM_id": fields.String,
            "Biosample_type": fields.String,
            "sample_id":fields.String,
            "cancer_nor":fields.String,
            "super_enhancer_number":fields.Integer,
            "has_input":fields.String,
            "has_normal":fields.String,
            "pass_coverage":fields.String,
            "pass_fastqc":fields.String,
        }
    ),
    "count":fields.Integer
}


class Sample(Resource):
    @marshal_with(sample_fields)
    def get(self):
        parser =  reqparse.RequestParser()
        parser.add_argument("cancer_type", type=str, default=[], action="append")
        parser.add_argument("source_type", type=str, default=[], action="append")
        parser.add_argument("query", type=str, default="")
        parser.add_argument("sort", type=str,default="")
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=10)
        args = parser.parse_args()
        print("start")
        record_skip = args["page"] * args["size"]
        record_limit = args["size"]
        sort_option = {"asc": 1, "desc": -1}
        print(args["cancer_type"])
        condition ={}
        if len(args["cancer_type"])>0:
            condition["cancer_nor"] = {"$in":args["cancer_type"]}
        if len(args["source_type"])>0:
            condition["Biosample_type"] = {"$in": args["source_type"]}
        if args.query != "":
            condition["$or"] = [
                {"GSM_id": {"$regex": args["query"], "$options": "$i"}},
                {"Biosample_type": {"$regex": args["query"], "$options": "$i"}},
                {"cancer_nor": {"$regex": args["query"], "$options": "$i"}},
                {"sample_id": {"$regex": args["query"], "$options": "$i"}}
            ]
        if args['sort']!="":
            print(args['sort'])
            result = mongo.db.sample_info.find(condition).sort("super_enhancer_number",
                sort_option[args.sort]).skip(record_skip).limit(record_limit)
        else:
            result = mongo.db.sample_info.find(condition).skip(record_skip).limit(record_limit)
        count = result.count()
        print(condition)
        return {"result":list(result),"count":count}
api.add_resource(Sample, "/sample")


class Cancers(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("source_type", type=str,default="")
        args = parser.parse_args()
        condition={}
        if args["source_type"]:
            if args["source_type"]!="":
                condition["Biosample_type"]=args["source_type"]
        result = mongo.db.sample_info.distinct('cancer_abbr',condition)
        result = sorted(result)
        return result
api.add_resource(Cancers, "/cancers")