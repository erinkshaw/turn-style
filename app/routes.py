from flask import render_template, send_from_directory
from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/data/<path:path>')
def send_json(path):
    # with app.open_resource(f'static/data/{path}.json') as f:
    #     # flask has a function to service directory as static
    #     # serve file as bytes instead of process
    #     data = json.load(f)
    #     return jsonify(data)
    return send_from_directory('static/data/', path)


