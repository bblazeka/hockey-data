using Newtonsoft.Json.Linq;
using Server.Mediators;
using Server.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using Server.ViewModels;
using AutoMapper;

namespace Server.Handlers
{
    public class LeagueHandler
    {
        public List<Team> Teams { get; private set; }
        private readonly IMapper _mapper;

        public LeagueHandler(IMapper mapper)
        {
            Teams = ParseTeams(ApiMediator.SendRequest(StandingsRequestBuilder("2019", "2020"))).ToList();
            _mapper = mapper;
        }

        public List<GameData> GetGamesForPrediction(string start, string end)
        {
            return ParseAnswer(ApiMediator.SendRequest(RequestBuilder(start, end)));
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

        public static List<GameViewData> ParseViewModelGames(string answer)
        {
            List<GameViewData> games = new List<GameViewData>();
            var jsonObject = JObject.Parse(answer);
            foreach (var date in jsonObject["dates"])
            {
                foreach (var game in date["games"])
                {

                    if (game["gameType"].ToObject<string>() == "R")
                    {
                        games.Add(new GameViewData
                        {
                            StartDate = DateTime.ParseExact(date["date"].ToString(), "yyyy-MM-dd", null),
                            Home = new TeamViewData(int.Parse(game["teams"]["home"]["team"]["id"].ToString()), "Team"),
                            Away = new TeamViewData(int.Parse(game["teams"]["away"]["team"]["id"].ToString()), "Team")
                        });
                    }
                }
            }
            return games;
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
            return teams.OrderBy(team => team.Name).ToList();
        }

        public static List<TeamViewData> ParseStandings(string answer)
        {
            List<TeamViewData> teams = new List<TeamViewData>();
            var jsonObject = JObject.Parse(answer);
            foreach (var record in jsonObject["records"])
            {
                var division = record["division"]["nameShort"].ToString();
                var conference = record["conference"]["name"].ToString();
                foreach (var teamRecord in record["teamRecords"])
                {
                    var teamViewData = new TeamViewData(Int32.Parse(teamRecord["team"]["id"].ToString()), teamRecord["team"]["name"].ToString())
                    {
                        Wins = Int32.Parse(teamRecord["leagueRecord"]["wins"].ToString()),
                        Losses = Int32.Parse(teamRecord["leagueRecord"]["losses"].ToString()),
                        Ot = Int32.Parse(teamRecord["leagueRecord"]["ot"].ToString()),
                        GoalsScored = Int32.Parse(teamRecord["goalsScored"].ToString()),
                        GoalsAgainst = Int32.Parse(teamRecord["goalsAgainst"].ToString()),
                        Points = Int32.Parse(teamRecord["points"].ToString()),
                        Conference = conference,
                        Division = division,
                        DivisionRank = Int32.Parse(teamRecord["divisionRank"].ToString()),
                        ConferenceRank = Int32.Parse(teamRecord["conferenceRank"].ToString()),
                        LeagueRank = Int32.Parse(teamRecord["leagueRank"].ToString()),
                        GamesPlayed = Int32.Parse(teamRecord["gamesPlayed"].ToString()),
                    };
                    teams.Add(teamViewData);
                }
            }
            return teams;
        }

        public string GetTeamNameById(int id)
        {
            return Teams.Find(x => x.Id == id).Name;
        }
    }
}
