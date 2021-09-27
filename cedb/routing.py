  
from flask import render_template, send_from_directory
from cedb import app

from cedb.routes.home import home  #ok
from cedb.routes.data import data  # ok
from cedb.routes.search import search
from cedb.routes.statistics import statistics
from cedb.routes.sample import sample
from cedb.routes.enhancer import enhancer
from cedb.routes.download import download

# routing
app.register_blueprint(home, url_prefix='/api/home')
app.register_blueprint(data, url_prefix="/api/data")
app.register_blueprint(search, url_prefix="/api/search")
app.register_blueprint(statistics, url_prefix="/api/statistics")
app.register_blueprint(sample, url_prefix="/api/sample")
app.register_blueprint(enhancer, url_prefix="/api/enhancer")
app.register_blueprint(download, url_prefix="/api/download")

@app.route("/", methods=["GET"])
def index():
    # return send_from_directory()
    return render_template("index.html")