import json

with open('data/lyrics_list.json', 'r') as file:
    data = json.load(file)
    
list_key = data['list_key']
list_lyrics = data['data']

def search_json(data, search_term):
    """
    Search through the dictionary
    """
    results = []

    def recursive_search(data, term, path=""):
        if isinstance(data, dict):
            for key, value in data.items():
                new_path = f"{path}/{key}" if path else key
                recursive_search(value, term, new_path)
        elif isinstance(data, list):
            for index, item in enumerate(data):
                new_path = f"{path}[{index}]"
                recursive_search(item, term, new_path)
        elif isinstance(data, str):
            if term.lower() in data.lower():  # Case-insensitive search
                results.append((path, data))
    
    recursive_search(data, search_term)
    return results

def get_lyrics(search_term):
    matches = search_json(data, search_term)

    if matches:
        for path, value in matches:
            return list_lyrics[value]
    else:
        return "not found"