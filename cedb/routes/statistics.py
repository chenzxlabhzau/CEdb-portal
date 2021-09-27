from flask import Blueprint, render_template
from cedb.db import mongo





from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal





# from flask_restplus import fields, Api, Resource

statistics = Blueprint("statistics", __name__)

api = Api(statistics)

statistics_fields = {
    "result":fields.Nested(
        {
        "peak_id": fields.String,
        "chr": fields.String,
        "start":fields.Integer,
        "end":fields.Integer,
        "strand":fields.String,
        "sample_coverage":fields.Integer,
        "nearest_gene":fields.String,
        "sample_number":fields.Integer,
        "Biosample_type":fields.String,
        "datatype":fields.String
        }
    ),
    "count":fields.Integer
}

class StatTable(Resource):
    @marshal_with(statistics_fields)
    def get(self):
        parser =  reqparse.RequestParser()
        parser.add_argument("peak_type", type=str, default=[], action="append")
        parser.add_argument("cancer_type", type=str)
        parser.add_argument("source_type", type=str, default=[], action="append")
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
        if args.query != "" and args["query"]!="undefined" and args["query"]!="null":
            condition["nearest_gene"]={"$regex": args.query, "$options": "i"}
        if args["chr"] != "undefined" and args["chr"] != "":
            condition["chr"] = args["chr"]
        if args["start"] != "":
            condition["start"] = {"$gte": int(args["start"])}
        if args["end"] != "":
            condition["end"] = {"$lte": int(args["end"])}
        if len(args["source_type"])>0:
            condition["Biosample_type"] = {"$in": args["source_type"]}
        if len(args["peak_type"])>0:
            condition["datatype"] = {"$in": args["datatype"]}
        if args['sort']!="no" and args['sort']!="":
            result = mongo.db["stat_"+args["cancer_type"]].find(condition,{"_id":0}).sort(args["sortcol"],sort_option[args.sort]).skip(record_skip).limit(record_limit)
        else:
            result = mongo.db["stat_"+args["cancer_type"]].find(condition).skip(record_skip).limit(record_limit)
        count = result.count()
        print(condition)
        return {"result": list(result), "count": count}
api.add_resource(StatTable, "/table")