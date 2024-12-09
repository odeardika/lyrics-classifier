from dotenv import dotenv_values
from re import sub as re_sub
from lyricsgenius import Genius
from clasification.preprocessing import text_preprocessing
import pickle



config = dotenv_values('.env')

list_model = {
    1 : 'models/model_svm.pkl',
    2 : 'models/model_mnb.pkl'
}

def get_lyrics(query : str):
    genius = Genius(config['GENIUS_ACCESS_TOKEN'])

    search_song = genius.search_songs(query)

    song_id = search_song['hits'][0]['result']['id']
    lyric = genius.lyrics(song_id)

    # cleaning lyric
    lyric = lyric[lyric.find('Lyrics')+6:]
    lyric = lyric[:-5]
    lyric = re_sub(r'\[.*?\]|\{.*?\}|\(.*?\)', ' ', lyric)
    
    return lyric


def search_song_request(query : str, model : int):
    lyric = get_lyrics(query)
    
    text_preprocessing(lyric)
    
    # transform tfidf
    with open(f'models/tfidf_vector.pkl', 'rb') as tfidf_file:
        tfidf = pickle.load(tfidf_file)
    
    lyric = tfidf.transform([lyric])
    
    # select and pickle.load model
    with open(list_model[model], 'rb') as model_file:
        model = pickle.load(model_file)
        
    prediction = model.predict(lyric)
    print(prediction)
    print(type(prediction.tolist()[0]))
    
    return {
        'status' : 200,
        'emotion' : prediction.tolist()[0],
    }
    
def predict_emotion(lyric : str, model : int):
    text_preprocessing(lyric)
    
    # transform tfidf
    with open(f'models/tfidf_vector.pkl', 'rb') as tfidf_file:
        tfidf = pickle.load(tfidf_file)
    
    lyric = tfidf.transform([lyric])
    
    # select and pickle.load model
    with open(list_model[model], 'rb') as model_file:
        model = pickle.load(model_file)
        
    prediction = model.predict(lyric)
    
    return {
        'status' : 200,
        'emotion' : prediction.tolist()[0],
    }


