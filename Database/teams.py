from datetime import datetime
from apihandler import wiki_api_advanced_request, wiki_api_request
from apihandler import nhl_api_request, mapbox_api_request
from dbhandler import get_collection

def map_location(element):
  return {
    "text": element["text"],
    "placeName": element["place_name"],
    "center": element["center"]
  }

collection = get_collection("teams")
player_collection = get_collection("players")

# fetching all teams
teams = []
for i in range(1,57):
  team = nhl_api_request("/api/v1/teams/{0}".format(i), {"expand": "team.roster"})
  teams.append(team["teams"][0])


for team in teams:
  # get location
  if "venue" in team:
    query = "{0} {1}".format(team["venue"]["name"], team["venue"]["city"])
  else:
    query = team["locationName"]
  location = list(map(map_location, mapbox_api_request(query)["features"]))[0]

  description = wiki_api_request(team["name"]).summary

  if "venue" in team:
    venue = team["venue"]
    venue["description"] = wiki_api_advanced_request(venue["name"], venue["city"]).summary

  
  filter = { "id": team["id"] }
  update = {
    "$set": {
          "name": team["name"],
          "active": team["active"],
          "abbreviation": team["abbreviation"],
          "locationName": team["locationName"],
          "description": description,
          "firstYearOfPlay": int(team["firstYearOfPlay"]) if "firstYearOfPlay" in team else None,
          "franchiseId": team["franchiseId"],
          "division": team["division"],
          "conference": team["conference"],
          "venue": venue,
          "location": location,
          "lastUpdate": datetime.now()
          }
  }
  result = collection.update_one(filter, update, True)
  print("{0} teams found, {1} inserted or updated. team name: {2} ".format(result.matched_count, result.modified_count, team["name"]))
  
  if "roster" in team:
    roster = team["roster"]["roster"]
    for player in roster:
      playerFilter = { "id": player["person"]["id"]}

      updatePlayer = {
          "$set": {
            "fullName": player["person"]["fullName"],
            "jerseyNumber": int(player["jerseyNumber"]) if "jerseyNumber" in player else None,
            "positon": player["position"],
            "active": True,
          },
        };
      
      player_result = player_collection.update_one(playerFilter, updatePlayer, True)
      print("team - player: {0} matched, {1} modified: {2}".format(player_result.matched_count, player_result.modified_count, player["person"]["fullName"]))