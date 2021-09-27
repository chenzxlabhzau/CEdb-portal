from flask import Blueprint, render_template
from cedb.db import mongo

from werkzeug.wrappers import AuthorizationMixin
import sys

from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal



download = Blueprint("download", __name__)

api = Api(download)

download_fields = {
    "result":fields.Nested(
        {
            "sample_id":fields.String,
            "GEO_id": fields.String,
            "GSM_id": fields.String,
            "Biosample_type": fields.String,
            "cancer_nor":fields.String,
            "super_enhancer_number":fields.Integer
        }
    ),
    "count":fields.Integer
}

class Download(Resource):
    @marshal_with(download_fields)
    def get(self):
        parser =  reqparse.RequestParser()
        parser.add_argument("query", type=str, default="")
        parser.add_argument("page", type=int, default=0)
        parser.add_argument("size", type=int, default=10)
        args = parser.parse_args()
        record_skip = args["page"] * args["size"]
        record_limit = args["size"]
        condition ={}
        if args.query != "":
            condition["$or"] = [
                {"GEO_id":{"$regex": args["query"],"$options": "$i"}},
                {"GSM_id": {"$regex": args["query"], "$options": "$i"}},
                {"Biosample_type": {"$regex": args["query"], "$options": "$i"}},
                {"cancer_nor": {"$regex": args["query"], "$options": "$i"}},
                {"sample_id": {"$regex": args["query"], "$options": "$i"}}
            ]
        result = mongo.db.sample_info.find(condition,{"_id":0,"super_enhancer_distribution":0,"typical_enhancer_distribution":0}).sort("GSM_id",1).skip(record_skip).limit(record_limit)
        count = result.count()
        return {"result":list(result),"count":count}
api.add_resource(Download, "/download")

