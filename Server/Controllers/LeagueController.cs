using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Handlers;
using Server.Mediators;
using Server.Models;
using Server.ViewModels;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;
using Server.Mediators;
using System;
using System.Collections.Generic;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    public class LeagueController : Controller
    {
        private LeagueHandler _leagueHandler;
        private readonly IMapper _mapper;

        public LeagueController(IMapper mapper)
        {
            _mapper = mapper;
            _leagueHandler = new LeagueHandler(mapper);
        }

        // GET api/league/schedule/{startDate}
        [HttpGet("schedule/{startDate}")]
        public object GetSchedule(string startDate, string endDate)
        {
            List<TeamViewData> teams = (List<TeamViewData>)(new DataController()).Teams();
            List<GameViewData> games = ParseViewModelGames(ApiMediator.SendRequest(ScheduleRequestBuilder(startDate, endDate)));

            foreach (TeamViewData team in teams)
            {
                team.Games = games.Where(g => g.Home.Id == team.Id || g.Away.Id == team.Id).ToList();
            }
            return teams;
        }

        // GET api/league/teams
        [HttpGet("teams")]
        public object GetTeams()
        {
            List<TeamViewData> teams = _leagueHandler.Teams.Select(x => _mapper.Map<TeamViewData>(x)).ToList();
            return teams.ToList();
        }

        // GET api/league/standings
        [HttpGet("standings")]
        public object GetStandings()
        {
            var teams = ParseStandings(ApiMediator.SendRequest(StandingsRequestBuilder("2019", "2020")));
            return teams;
        }

        public static string StandingsRequestBuilder(string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/standings?season={0}{1}", start, end);
        }

        public static string ScheduleRequestBuilder(string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&startDate={0}&endDate={1}", start, end);
        }

        public static string ScheduleRequestBuilder(string team, string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&teamId={0}&startDate={1}&endDate={2}", team, start, end);
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
                            Home = ((List<TeamViewData>)((new DataController()).Team(int.Parse(game["teams"]["home"]["team"]["id"].ToString())))).FirstOrDefault(),
                            Away = ((List<TeamViewData>)((new DataController()).Team(int.Parse(game["teams"]["away"]["team"]["id"].ToString())))).FirstOrDefault()
                        });
                    }
                }
            }
            return games;
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
                    var teamViewData = ((List<TeamViewData>)((new DataController()).Team(Int32.Parse(teamRecord["team"]["id"].ToString())))).FirstOrDefault();

                    teamViewData.Wins = Int32.Parse(teamRecord["leagueRecord"]["wins"].ToString());
                    teamViewData.Losses = Int32.Parse(teamRecord["leagueRecord"]["losses"].ToString());
                    teamViewData.Ot = Int32.Parse(teamRecord["leagueRecord"]["ot"].ToString());
                    teamViewData.GoalsScored = Int32.Parse(teamRecord["goalsScored"].ToString());
                    teamViewData.GoalsAgainst = Int32.Parse(teamRecord["goalsAgainst"].ToString());
                    teamViewData.Points = Int32.Parse(teamRecord["points"].ToString());
                    teamViewData.Conference = conference;
                    teamViewData.Division = division;
                    teamViewData.DivisionRank = Int32.Parse(teamRecord["divisionRank"].ToString());
                    teamViewData.ConferenceRank = Int32.Parse(teamRecord["conferenceRank"].ToString());
                    teamViewData.LeagueRank = Int32.Parse(teamRecord["leagueRank"].ToString());
                    teamViewData.GamesPlayed = Int32.Parse(teamRecord["gamesPlayed"].ToString());

                    teams.Add(teamViewData);
                }
            }
            return teams;
        }
    }
}
