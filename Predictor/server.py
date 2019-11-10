from flask import (Flask, request)
from flask_cors import CORS
from flask.json import jsonify
import requests

from datetime import date

from .twitter import get_news

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
                "away_probability": away_points
            })
    
    # printing the output 
    return jsonify(games)

@app.route('/evaluate')
def evaluate():
    return jsonify("not implemented yet")

@app.route('/news')
def news():
    return jsonify(get_news())

# team's overall stats
def get_team_coeff(team):
    coefficient = 0

    # Calculation for last season
    last_stats_URL = "https://statsapi.web.nhl.com/api/v1/teams/{}?expand=team.stats&season=20182019".format(str(team["team"]["id"]))
    # sending get request and saving the response as response object
    r = requests.get(url = last_stats_URL)
    # extracting data in json format 
    data = r.json()
    coefficient += 0.8*calculate_seasonal_stats(data)

    # Calculation for this season
    stats_URL = "https://statsapi.web.nhl.com/api/v1/teams/{}?expand=team.stats&season=20192020".format(str(team["team"]["id"]))
    # sending get request and saving the response as response object
    r = requests.get(url = stats_URL)
    # extracting data in json format 
    data = r.json()
    coefficient += calculate_seasonal_stats(data)
    return coefficient

def previous_matchups(home,away):
    home_points = 0
    away_points = 0
    # games between same opponents in the last season
    schedule_URL = "https://statsapi.web.nhl.com/api/v1/schedule?teamId={}&startDate=2018-10-01&endDate=2019-04-30".format(str(home["id"]))
    # sending get request and saving the response as response object
    r = requests.get(url = schedule_URL)
    # extracting data in json format 
    data = r.json()
    for date in data["dates"]:
        for game in date["games"]:
            game_home = game["teams"]["home"]
            game_away = game["teams"]["away"]
            if (home == game_home["team"] and away == game_away["team"]):
                home_points += 0.3*(game_home["score"] - game_away["score"])
                away_points += 0.3*(game_away["score"] - game_home["score"]) 
            if (home == game_away["team"] and away == game_home["team"]):
                home_points += 0.1*(game_away["score"] - game_home["score"])
                away_points += 0.1*(game_home["score"] - game_away["score"])
    return home_points, away_points

def calculate_seasonal_stats(data):
    # calculates coefficient based on overall team's seasonal stats
    coefficient = 0
    team_stats = data["teams"][0]["teamStats"][0]["splits"][0]["stat"]
    coefficient += 0.5*(team_stats["wins"]/82 - team_stats["losses"]/82 + 0.3 * team_stats["ot"]/82)
    return coefficient