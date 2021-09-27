from flask_pymongo import PyMongo
from cedb import app

app.config["MONGO_URI"] = "mongodb://cedb_reader:cedb_reader_access@localhost:27017/CEdb"
mongo = PyMongo(app)