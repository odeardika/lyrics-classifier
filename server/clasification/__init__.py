import sys
import os
import joblib

# from .lyrics import get_lyrics
from .preprocessing import text_preprocessing

current_path = os.path.dirname(os.path.realpath(__file__))
models_path = os.path.join(current_path, "models")

if models_path not in sys.path:
    sys.path.append(models_path)

tfidf = joblib.load(os.path.join(models_path, "output/tfidf.joblib"))
mnb = joblib.load(os.path.join(models_path, "output/model_mnb.joblib"))
svm = joblib.load(os.path.join(models_path, "output/model_svm.joblib"))

list_model = {
    1: mnb,
    2: svm,
}


# def search_song_request(query: str, model: int):
#     lyric = get_lyrics(query)
#     if lyric == "not found":
#         return {"status": 404, "message": "lyric not found"}

#     lyric_transformed = tfidf.transform(" ".join(sentence) for sentence in lyric)
#     selected_model = list_model[model]
#     prediction = selected_model.predict(lyric_transformed)
#     return {
#         "status": 200,
#         "emotion": prediction.tolist()[0],
#     }


def predict_emotion(lyric: str, model: int):
    lyric = text_preprocessing(lyric)
    lyric_transformed = tfidf.transform([" ".join(sentence) for sentence in [lyric]])

    selected_model = list_model[model]

    prediction = selected_model.predict(lyric_transformed)

    
    if model == 1 :
        # Multinomial Naive Bayes model
        
        probabilities = selected_model.predict_proba_percent(lyric_transformed)[0]
        print(float(probabilities[0]), float(probabilities[1]))
        
        return {
            "status": 200,
            "emotion": prediction.tolist()[0],
            "probabilities": {
                "happy": float(probabilities[1]),
                "sad": float(probabilities[0]),
            },
        }
        
    elif model == 2:
        # SVM model
        results = selected_model.predict_with_confidence(lyric_transformed)
        
        # # Access the results
        # confidence_scores = results["confidence_scores"]
        # confidence_percentages = results["confidence_percentages"]
        
        return {
            "status": 200,
            "emotion": prediction.tolist()[0],
            "confidence_scores": results,
        }
    else:
        return {
            "status": 200,
            "emotion": prediction.tolist()[0],
        }
