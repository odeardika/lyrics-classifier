from dotenv import dotenv_values
from re import sub as re_sub
from clasification.lyrics import get_lyrics
from clasification.preprocessing import text_preprocessing
import pickle



config = dotenv_values('.env')

list_model = {
    1 : 'models/model_svm.pkl',
    2 : 'models/model_mnb.pkl'
}

def search_song_request(query : str, model : int):
    lyric = get_lyrics(query)
    if lyric == 'not found':
        return {
            'status' : 404,
            'message' : 'lyric not found'
        }
    
    # transform tfidf
    with open(f'models/tfidf_vector.pkl', 'rb') as tfidf_file:
        tfidf = pickle.load(tfidf_file)
    
    lyric = tfidf.transform(' '.join(sentence) for sentence in lyric)
    
    # select and pickle.load model
    with open(list_model[model], 'rb') as model_file:
        model = pickle.load(model_file)
        
    prediction = model.predict(lyric)
    
    return {
        'status' : 200,
        'emotion' : prediction.tolist()[0],
    }
    
def predict_emotion(lyric : str, model : int):
    lyric = text_preprocessing(lyric)
    
    
    # transform tfidf
    with open(f'models/tfidf_vector.pkl', 'rb') as tfidf_file:
        tfidf = pickle.load(tfidf_file)
    
    lyric = tfidf.transform(' '.join(sentence) for sentence in lyric)
    
    
    # select and pickle.load model
    with open(list_model[model], 'rb') as model_file:
        model = pickle.load(model_file)
        
    prediction = model.predict(lyric)
    
    return {
        'status' : 200,
        'emotion' : prediction.tolist()[0],
    }


