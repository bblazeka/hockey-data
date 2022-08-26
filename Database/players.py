from datetime import datetime, timedelta
from scrapinghandler import scrapPlayerCapHit
from utils import get_prop
from apihandler import nhl_api_request
from dbhandler import get_collection
import re
from bson import Decimal128 as Decimal

collection = get_collection("players")

players = collection.find({ "active": True})

acceptable_interval = datetime.now() + timedelta(days=-7)
for player in players:
  if "lastUpdate" in player and player["lastUpdate"] > acceptable_interval:
    continue
  player_response = nhl_api_request("/api/v1/people/{0}".format(player["id"]), {})["people"][0]
  player_cap_hit = scrapPlayerCapHit(player["fullName"])
  if (player_cap_hit is None):
    if("altName" not in player):
      player_cap_hit = scrapPlayerCapHit("{0}1".format(player["fullName"]))
    else:
      player_cap_hit = scrapPlayerCapHit(player["altName"])

  filter = { "id": player_response["id"] }

  if ("height" in player_response):
    player_height_temp = str(player_response["height"]).split(" ")
    feet_height = int(re.sub("[^0-9]", "", player_height_temp[0]))
    inches_height = int(re.sub("[^0-9]", "", player_height_temp[1]))
    player_height = round(feet_height/ 3.2808 * 100 + inches_height / 0.3937)
  else:
    player_height = None
  if ("weight" in player_response):
    player_weight = round(int(player_response["weight"]) * 0.45359237)
  else:
    player_weight = None
  if ("birthCity" in player_response):
    if ("birthStateProvince" in player_response):
      player_birth_city = "{0}, {1}, {2}".format(player_response["birthCity"], player_response["birthStateProvince"], player_response["birthCountry"])
    else:
      player_birth_city = "{0}, {1}".format(player_response["birthCity"], player_response["birthCountry"])
  else:
    player_birth_city = None
  update = {
    "$set": {
      "fullName": player_response["fullName"],
      "firstName": player_response["firstName"],
      "lastName": player_response["lastName"],
      "capHit": Decimal(player_cap_hit),
      "primaryNumber": get_prop(player_response,"primaryNumber"),
      "currentAge": get_prop(player_response,"currentAge"),
      "birthDate": player_response["birthDate"],
      "height": player_height,
      "weight": player_weight,
      "birthCity": player_birth_city,
      "nationality": player_response["nationality"],
      "active": player_response["active"],
      "alternateCaptain": get_prop(player_response,"alternateCaptain"),
      "captain": get_prop(player_response,"captain"),
      "rookie": player_response["rookie"],
      "shootsCatches": get_prop(player_response,"shootsCatches"),
      "rosterStatus": player_response["rosterStatus"],
      "currentTeam": get_prop(player_response,"currentTeam"),
      "primaryPosition": player_response["primaryPosition"],
      "lastUpdate": datetime.now()
    }
  }
  result = collection.update_one(filter, update, True)
  print("{0} players found, {1} inserted or updated. Player: {2} ".format(result.matched_count, result.modified_count, player["fullName"]))
    