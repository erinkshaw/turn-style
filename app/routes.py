from flask import render_template, url_for, jsonify, json
import os
from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/data/<path:path>')
def send_json(path):
    with app.open_resource(f'static/data/{path}.json') as f:
        data = json.load(f)
        return jsonify(data)


