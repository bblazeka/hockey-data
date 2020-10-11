using AutoMapper;
using DataServer.Mediators;
using DataServer.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServer.Util
{
    public class LeagueHandler
    {
        public List<Team> Teams { get; private set; }
        private readonly IMapper _mapper;
        private DbMediator _db;

        public LeagueHandler(IMapper mapper)
        {
            Teams = ParseTeams(ApiMediator.SendRequest(StandingsRequestBuilder("2019", "2020"))).ToList();
            _db = new DbMediator();
            _mapper = mapper;
        }

        public List<GameData> GetGamesForPrediction(string start, string end)
        {
            return ParseAnswer(ApiMediator.SendRequest(RequestBuilder(start, end)));
        }

        public List<Article> GetArticles() 
        {
            return ParseNews(ApiMediator.SendRequest("http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/news"));
        }

        public List<Score> GetScoreboard()
        {
            return ParseScoreboard(ApiMediator.SendRequest("http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard"));
        }

        public static string RequestBuilder(string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&startDate={0}&endDate={1}", start, end);
        }

        public static string RequestBuilder(string team, string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&teamId={0}&startDate={1}&endDate={2}", team, start, end);
        }

        public static string StandingsRequestBuilder(string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/standings?season={0}{1}", start, end);
        }

        public static List<GameData> ParseAnswer(string answer)
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
                            Home = new Team(int.Parse(game["teams"]["home"]["team"]["id"].ToString()), "Team"),
                            HomeWins = int.Parse(game["teams"]["home"]["leagueRecord"]["wins"].ToString()),
                            HomeLosses = int.Parse(game["teams"]["home"]["leagueRecord"]["losses"].ToString()),
                            HomeOT = int.Parse(game["teams"]["home"]["leagueRecord"]["ot"].ToString()),
                            Away = new Team(int.Parse(game["teams"]["away"]["team"]["id"].ToString()), "Team"),
                            AwayWins = int.Parse(game["teams"]["away"]["leagueRecord"]["wins"].ToString()),
                            AwayLosses = int.Parse(game["teams"]["away"]["leagueRecord"]["losses"].ToString()),
                            AwayOT = int.Parse(game["teams"]["away"]["leagueRecord"]["ot"].ToString()),
                        });
                    }
                }
            }
            return games;
        }

        public List<Article> ParseNews(string answer)
        {
            List<Article> articles = new List<Article>();
            var jsonObject = JObject.Parse(answer);
            foreach (var article in jsonObject["articles"])
            {
                Team team = new Team();
                List<Player> player = new List<Player>();
                foreach(var category in article["categories"])
                {
                    if (category["type"].ToString().Equals("team"))
                    {
                        team = _db.GetTeamsByName(category["description"].ToString()).FirstOrDefault();
                    }
                    else if (category["type"].ToString().Equals("athlete"))
                    {
                        player.Add(_db.GetPlayersByName(category["description"].ToString()).FirstOrDefault());
                    }
                }
                articles.Add(new Article(){
                    Source = "ESPN",
                    Headline = article["headline"].ToString(),
                    Description = article["description"].ToString(),
                    Players = player,
                    Team = team
                });
            }
            return articles;
        }

        public List<Score> ParseScoreboard(string answer)
        {
            List<Score> scores = new List<Score>();
            var jsonObject = JObject.Parse(answer);
            foreach (var e in jsonObject["events"])
            {
                scores.Add(new Score(){
                    Name = e["name"].ToString(),
                    ShortName = e["shortName"].ToString(),
                    Clock = Convert.ToInt32(e["status"]["clock"]),
                    DisplayClock = e["status"]["displayClock"].ToString()
                });
            }
            return scores;
        }

        public static List<Team> ParseTeams(string answer)
        {
            List<Team> teams = new List<Team>();
            var jsonObject = JObject.Parse(answer);
            foreach (var record in jsonObject["records"])
            {
                foreach (var teamRecord in record["teamRecords"])
                {
                    teams.Add(new Team(Int32.Parse(teamRecord["team"]["id"].ToString()), teamRecord["team"]["name"].ToString()));
                }
            }
            return teams.OrderBy(team => team.FullName).ToList();
        }

        public string GetTeamNameById(int id)
        {
            return Teams.Find(x => x.Id == id).FullName;
        }
    }
}
