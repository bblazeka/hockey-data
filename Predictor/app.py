from flask import (Flask, request)
from flask_cors import CORS
from flask.json import jsonify
import requests

from datetime import date

from .twitter import get_news
from .prediction import previous_matchups, get_team_coeff

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return predict()

@app.route('/predict')
def predict():
    today_date = date.today().strftime("%Y-%m-%d")
    # api-endpoint 
    URL = "https://statsapi.web.nhl.com/api/v1/schedule?date="+today_date
    
    # defining a params dict for the parameters to be sent to the API 
    #PARAMS = {'address':location} 
    
    # sending get request and saving the response as response object 
    #r = requests.get(url = URL, params = PARAMS) 
    r = requests.get(url = URL)

    # extracting data in json format 
    data = r.json() 
    
    # extracting data from output
    games = []
    for date_games in data["dates"]:
        for game in date_games["games"]:
            home = game["teams"]["home"]
            home_record = home["leagueRecord"]
            away = game["teams"]["away"]
            away_record = away["leagueRecord"]
            home_mutual, away_mutual = previous_matchups(home["team"],away["team"])
            home_points = 0.2 + get_team_coeff(home) + home_mutual
            away_points = get_team_coeff(away) + away_mutual
            if home_points >= away_points:
                prediction = 1
            else:
                prediction = 2
            games.append({
                "home": home["team"],
                "away": away["team"],
                "prediction": prediction,
                "home_probability": home_points,
                "home_record": home_record,
                "away_probability": away_points,
                "away_record": away_record
            })
    
    # printing the output 
    return jsonify(games)

@app.route('/evaluate')
def evaluate():
    return jsonify("not implemented yet")

@app.route('/news')
def news():
    return jsonify(get_news())

