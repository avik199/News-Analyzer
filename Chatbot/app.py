from flask import Flask, request, jsonify
import requests
import random
app = Flask(__name__)

client_id = "7302e978f89049e688d46fc635d928e8"
client_secret = "a6081fa4fdc4423b97bf2ceb699bbcbc"
access_token = ""


def search_songs(artist):
    # Authenticate and get the access token
    auth_response = requests.post('https://accounts.spotify.com/api/token', {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
    })
    access_token = auth_response.json()['access_token']

    # Search for songs by the given artist and get the URIs of the top 5 results
    search_response = requests.get('https://api.spotify.com/v1/search', headers={
        'Authorization': f'Bearer {access_token}'
    }, params={
        'q': f'artist:{artist}',
        'type': 'track',
        'limit': 5
    })
    tracks = search_response.json()['tracks']['items']
    random.shuffle(tracks)
    song_links = [f'{track["name"]}-->{track["external_urls"]["spotify"]}" \n' for track in tracks]
    return song_links


@app.route('/', methods=['POST'])
def index():
    data = request.get_json()
    artist = data['queryResult']['parameters']['music-artist']
    song_links = search_songs(artist)
    song_links_str = ', '.join(song_links)
    response = {
        'fulfillmentText': f"Here are the top 5 songs by {artist}\n\n: {song_links_str}",
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
