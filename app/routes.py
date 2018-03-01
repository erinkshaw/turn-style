from flask import render_template, jsonify
from app import app, config
from pymongo import MongoClient
import json
from bson import json_util

client = MongoClient(f'mongodb+srv://erinkshaw:{config.mongo_db_pw}@turnstyle-hs7gg.mongodb.net/test')
db = client.mta.filteredTurns

@app.route('/')
@app.route('/index')
def index():
    dates = db.distinct('DATE')
    stations = db.distinct('STATION')
    print(stations)
    return render_template('index.html', dates=dates, stations=stations)

@app.route('/api/<path:date>/<hour>', methods=['GET'])
def get_all_stations_by_hour(date, hour):
    data = list(db.find({'DATE': date, 'TIME': hour}))
    return json.dumps(data, default=json_util.default)
