from flask_pymongo import PyMongo
from cedb import app

app.config["MONGO_URI"] = "mongodb://cedb_reader:passwdxxxxxx@localhost:xxxxx/CEdb"
mongo = PyMongo(app)
