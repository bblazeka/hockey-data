using Newtonsoft.Json.Linq;
using Server.Mediators;
using Server.Models;
using System;
using System.Linq;
using System.Collections.Generic;

namespace Server.Handlers
{
    public class LeagueHandler
    {
        private TeamHandler _teamHandler;
        public LeagueHandler(TeamHandler teamHandler)
        {
            _teamHandler = teamHandler;
        }

        public List<Team> GetTeamsSchedule(string start, string end)
        {
            List<GameData> games = BasicParseAnswer(ApiMediator.SendRequest(RequestBuilder(start, end)));
            List<Team> teams = _teamHandler.Teams;
            foreach(Team team in teams) {
                team.Games = games.Where(g => g.Home.Id == team.Id || g.Away.Id == team.Id).ToList();
            }
            return teams;
        }

        public static string RequestBuilder(string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&startDate={0}&endDate={1}", start, end);
        }

        public static string RequestBuilder(string team, string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&teamId={0}&startDate={1}&endDate={2}", team, start, end);
        }

        public static List<GameData> BasicParseAnswer(string answer)
        {
            List<GameData> games = new List<GameData>();
            var jsonObject = JObject.Parse(answer);
            foreach (var date in jsonObject["dates"])
            {
                foreach (var game in date["games"])
                {

                    if (game["gameType"].ToObject<string>() == "R")
                    {
                        games.Add(new GameData
                        {
                            StartDate = DateTime.ParseExact(date["date"].ToString(), "yyyy-MM-dd", null),
                            Home = new Team(int.Parse(game["teams"]["home"]["team"]["id"].ToString()),"Team"),
                            Away = new Team(int.Parse(game["teams"]["away"]["team"]["id"].ToString()), "Team")
                        });
                    }
                }
            }
            return games;
        }
    }
}
