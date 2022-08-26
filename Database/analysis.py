from datetime import datetime
from apihandler import nhl_api_request, enhanced_nhl_api_request
from dbhandler import get_collection
from collections import defaultdict
from utils import get_prop
from constants import DEFAULT_SEASON
import re

def abbrev_name(first_name, last_name):
  return "{0}. {1}".format(first_name[0], last_name) 

def parse_ordinals(stats):
  dictionary = {}
  for prop, value in stats.items():
    dictionary[prop] = int(re.sub("[^0-9]", "", value))
  return dictionary

collection = get_collection("analysis")

season = DEFAULT_SEASON
standings = nhl_api_request("/api/v1/standings", {"season": season})
records = standings["records"]



for record in records:
  for teamRecord in record["teamRecords"]:
    player_stats = nhl_api_request("/api/v1/teams/{0}".format(teamRecord["team"]["id"]), { "hydrate": "roster(season={0},person(stats(splits=statsSingleSeason)))".format(season)})

    enhanced_query_options =  {"isAggregate": "false", "isGame": "false", "start": "0", "limit": "50", "factCayenneExp": "gamesPlayed>=1", "cayenneExp": "teamId={0} and gameTypeId=2 and seasonId <= {1} and seasonId >= {1}".format(teamRecord["team"]["id"], season)}
    skater_scoring_stats = enhanced_nhl_api_request("/stats/rest/en/skater/scoringRates", enhanced_query_options)["data"]
    skater_pp_stats =  enhanced_nhl_api_request("/stats/rest/en/skater/powerplay", enhanced_query_options)["data"]
    enhanced_goalies =  enhanced_nhl_api_request("/stats/rest/en/goalie/advanced", enhanced_query_options)["data"]

    enhanced_skaters = defaultdict(list)
    for skater_scoring in skater_scoring_stats:
      pp_stats = next((x for x in skater_pp_stats if x["playerId"] == skater_scoring["playerId"]), None)
      enhanced_skaters[skater_scoring["playerId"]] = skater_scoring | pp_stats
    # filter players that didn't play at all
    players_roster = player_stats["teams"][0]["roster"]["roster"]
    players_playing = [a for a in players_roster if len(a["person"]["stats"][0]["splits"]) > 0]
    players_playing_enhanced_stats = []
    for playing_player in players_playing:
      
      for x, v in enhanced_skaters.items():
        if x == playing_player["person"]["id"]:
          pl = v
          break
      if (pl is None):
        for x, v in enhanced_goalies:
          if x == playing_player["person"]["id"]:
            pl = v
            break
      person = playing_player["person"]
      players_playing_enhanced_stats.append({
        "id": person["id"],
        "abbrName": abbrev_name(person["firstName"], person["lastName"]) ,
        "fullName": person["fullName"],
        "primaryNumber": get_prop(person,"primaryNumber"),
        "positionName":person["primaryPosition"]["name"],
        "nationality": person["nationality"],
        "currentAge": get_prop(person,"currentAge"),
        "stats": person["stats"][0]["splits"][0]["stat"],
        "advancedStats": pl
      })

    team_stats = nhl_api_request("/api/v1/teams/{0}/stats".format(teamRecord["team"]["id"]), {})
    filter = { "id": teamRecord["team"]["id"] }
    
    try:
      update = {
        "$set": {
          "id": teamRecord["team"]["id"],
          "team": teamRecord["team"],
          "leagueRecord": teamRecord["leagueRecord"],
          "points": teamRecord["points"],
          "regulationWins": teamRecord["regulationWins"],
          "leagueRank": int(teamRecord["leagueRank"]),
          "leagueL10Rank": int(teamRecord["leagueL10Rank"]),
          "leagueHomeRank": int(teamRecord["leagueHomeRank"]),
          "leagueRoadRank": int(teamRecord["leagueRoadRank"]),
          "ppLeagueRank": int(teamRecord["ppLeagueRank"]),
          "divisionRank": int(teamRecord["divisionRank"]),
          "divisionL10Rank": int(teamRecord["divisionL10Rank"]),
          "divisionHomeRank": int(teamRecord["divisionHomeRank"]),
          "divisionRoadRank": int(teamRecord["divisionRoadRank"]),
          "ppDivisionRank": int(teamRecord["ppDivisionRank"]),
          "conferenceRank": int(teamRecord["conferenceRank"]),
          "conferenceL10Rank": int(teamRecord["conferenceL10Rank"]),
          "conferenceHomeRank": int(teamRecord["conferenceHomeRank"]),
          "conferenceRoadRank": int(teamRecord["conferenceRoadRank"]),
          "ppConferenceRank": int(teamRecord["ppConferenceRank"]),
          "row": teamRecord["row"],
          "statsSingleSeason": team_stats["stats"][0]["splits"][0]["stat"],
          "regularSeasonStatRankings": parse_ordinals(team_stats["stats"][1]["splits"][0]["stat"]),
          "rosterStats": players_playing_enhanced_stats,
          "lastUpdate": datetime.now()
        }
      }
      result = collection.update_one(filter, update, True)
      print("updated analysis for: {0}".format(teamRecord["team"]["name"]))
    except Exception as e:
      print("exception occured")
      print(e)
