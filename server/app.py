from flask import Flask
from handlers.route import configure_routes
from clasification.model import MultinomialNaiveBayes, SVM, TFIDF
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

configure_routes(app)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=8000)