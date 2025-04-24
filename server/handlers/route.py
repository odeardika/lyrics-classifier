from flask import request
from clasification import predict_emotion

def configure_routes(app):
    @app.route("/")
    def index():
        return "Hello, World!"

    # @app.route("/search", methods=["POST"])
    # def search():
    #     query = request.json['query']
    #     model = request.json['model']
    #     return search_song_request(query, model)
    
    @app.route("/predict", methods=["POST"])
    def predict_lyric():
        lyric = request.json['lyric']
        model = request.json['model']
        return predict_emotion(lyric, model)