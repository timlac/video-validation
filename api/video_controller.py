from flask import Flask, make_response, send_file, send_from_directory, render_template
from flask_restful import Resource, Api
import sys
import os
from flask_cors import CORS
import json
from flask import request

app = Flask(__name__)
CORS(app)
api = Api(app)
port = 5100

# A55_mix_ang_disg_5050.mp4


@app.route("/<string:filename>")
def return_video_content(filename):
    path = "../files"
    file = os.path.join(path, filename)
    return send_file(file)


@app.route("/name/<string:filename>")
def return_video_name(filename):
    d = {"video_name": filename}
    return d


@app.route("/add_response", methods=['POST'])
def add_response():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        resp = request.json
        print(resp)
        return resp
    else:
        return 'Content-Type not supported!'


@app.route('/')
def index():
    return None

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if sys.argv.__len__() > 1:
    port = sys.argv[1]
print("Api running on port : {} ".format(port))

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=port)