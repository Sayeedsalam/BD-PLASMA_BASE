from flask import Flask, request, url_for
from flask_pymongo import PyMongo


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://admin:admin@cluster0-shard-00-00-jis28.gcp.mongodb.net:27017,cluster0-shard-00-01-jis28.gcp.mongodb.net:27017,cluster0-shard-00-02-jis28.gcp.mongodb.net:27017/test?ssl=true&ssl_cert_reqs=CERT_NONE&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'
mongo = PyMongo(app)

@app.route('/donor-register')
def index():
    return "Hello"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
