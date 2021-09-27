from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# config database

app.config.from_object('cedb.config')

import cedb.db
import cedb.routing