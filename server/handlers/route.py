from flask import request
from clasification import get_lyrics

def configure_routes(app):
    @app.route("/")
    def index():
        return "Hello, World!"

    @app.route("/search", methods=["GET"])
    def search():
        query = request.args.get('query')
        lyrics = get_lyrics(query)
        return lyrics