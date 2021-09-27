from flask import Blueprint, render_template
from cedb.db import mongo





from flask_restful import Api, Resource, fields, marshal_with, reqparse, marshal





# from flask_restplus import fields, Api, Resource

home = Blueprint("home", __name__)

api = Api(home)

datasum_fields = {
    "legend": fields.List,
    "xAxis": fields.List,
    "primary": fields.List,
    "cell_line": fields.List
}

class DataSum(Resource):
    def get(self):
        legend=['Primary tissue','Cell line']
        cancer_type = mongo.db.sample_info.distinct("cancer_nor")
        pri = []
        for c in cancer_type:
            n =mongo.db.sample_info.find({"Biosample_type":'Primary tissue',"cancer_nor":c}).count()
            pri.append(n)
        cell = []
        for c in cancer_type:
            n = mongo.db.sample_info.find({"Biosample_type": 'Cell line',"cancer_nor":c}).count()
            cell.append(n)
        result  = {
            "legend":legend,
            "xAxis":cancer_type,
            "primary":pri,
            "cell_line":cell
        }
        return result
api.add_resource(DataSum, "/datasum")