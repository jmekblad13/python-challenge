from flask import Flask, render_template, jsonify, redirect
from flask_pymongo import PyMongo
import pymongo
import mars_scrape

app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.nasa_db

#mongo = PyMongo(app)

@app.route("/")
def index():
    articles = list(db.articles.find())
    mars_data = mars_scrape.scrape()
    return render_template("index.html", articles=articles, mars_data=mars_data)

@app.route("/scrape")
def scrape():
    articles = list(db.articles.find())
    mars_data = mars_scrape.scrape()
  
    return redirect("http://127.0.0.1:5000/", code=302)

if __name__ == "__main__":
    app.run(debug=True)
