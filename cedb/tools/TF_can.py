#给TF举例

import pymongo
import json
import argparse,os
client = pymongo.MongoClient('mongodb://127.0.0.1:27017')
db = client.CEdb


