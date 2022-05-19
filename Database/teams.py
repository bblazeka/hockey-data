from datetime import datetime
from apihandler import nhl_api_request, mapbox_api_request
from dbhandler import get_collection

collection = get_collection("teams")

# fetching all teams
teams = []
for i in range(1,57):
  team = nhl_api_request("/api/v1/teams/{0}".format(i), {"expand": "team.roster"})
  teams.append(team["teams"][0])


for team in teams:
  print(team)
  if "venue" in team:
    query = "{0} {1}".format(team["venue"]["name"], team["venue"]["city"])
  else:
    query = team["locationName"]
  location = mapbox_api_request(query)
  print(location)