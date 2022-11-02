from datetime import datetime
from apihandler import nhl_api_request
from dbhandler import get_collection
import sys

start_date = "2022-10-01"
end_date = "2023-05-01"
if len(sys.argv) > 2:
  start_date = sys.argv[1]
  end_date = sys.argv[2]

collection = get_collection("games")

all_games = nhl_api_request("/api/v1/schedule", {"startDate": start_date, "endDate": end_date})
dates = all_games["dates"]

updated_games = 0
for date in dates:
  games = date["games"]
  for game in games:
    filter = { "gamePk": game["gamePk"] }
    update = {
          "$set": {
            "gameType": game["gameType"],
            "season": game["season"],
            "date": date["date"],
            "gameDate": datetime.strptime(game["gameDate"], '%Y-%m-%dT%H:%M:%SZ'),
            "home": game["teams"]["home"],
            "away": game["teams"]["away"],
            "status": game["status"],
            "venue": game["venue"],
            "lastUpdate": datetime.now()
          }
        }
    result = collection.update_one(filter, update, True)
    print("{0} games found, {1} inserted or updated. Game Id: {2} ".format(result.matched_count, result.modified_count, game["gamePk"]))
    updated_games+=1

print("updated games: {0}".format(updated_games))
