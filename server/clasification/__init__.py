from dotenv import dotenv_values
from lyricsgenius import Genius

config = dotenv_values('.env')

def get_lyrics(query : str):
    genius = Genius(config['GENIUS_ACCESS_TOKEN'])

    search_song = genius.search_songs(query)

    song_id = search_song['hits'][0]['result']['id']
    lyrics = genius.lyrics(song_id)

    return lyrics

