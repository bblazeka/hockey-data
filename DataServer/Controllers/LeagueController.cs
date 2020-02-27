using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataServer.Mediators;
using DataServer.Util;
using DataServer.ViewModels;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeagueController : ControllerBase
    {
        private LeagueHandler _leagueHandler;
        private readonly IMapper _mapper;
        private DbMediator _mediator;

        public LeagueController(IMapper mapper)
        {
            _mapper = mapper;
            _mediator = new DbMediator();
            _leagueHandler = new LeagueHandler(mapper);
        }

        // GET api/league/schedule/{startDate}
        [HttpGet("schedule/{startDate}")]
        public object GetSchedule(string startDate, string endDate)
        {
            List<TeamViewModel> teams = _mediator.GetTeams().Select(x => _mapper.Map<TeamViewModel>(x)).ToList();
            List<GameViewModel> games = ParseViewModelGames(ApiMediator.SendRequest(ScheduleRequestBuilder(startDate, endDate)));

            foreach (TeamViewModel team in teams)
            {
                team.Games = games.Where(g => g.Home.Id == team.Id || g.Away.Id == team.Id).ToList();
                team.ScheduleStatus = new ScheduleStatusViewModel();
                team.Games.ForEach(el => {
                    team.ScheduleStatus.HomeGames += (el.Home.Id == team.Id) ? 1 : 0;
                    var newTeam = (el.Home.Id == team.Id) ? 
                        teams.Where(t => t.Id == el.Away.Id).First()
                         : 
                        teams.Where(t => t.Id == el.Home.Id).First();
                    team.ScheduleStatus.HigherPlacedOpponent += (newTeam.LeagueRank < team.LeagueRank) ? 1 : 0;
                    team.ScheduleStatus.Opponents.Add((el.Home.Id == team.Id) ? 
                        el.Away
                         : 
                        el.Home);
                });
                
            }
            return JsonConvert.SerializeObject(teams.OrderBy(t => t.Name));
        }

        // GET api/league/teams
        [HttpGet("teams")]
        public object GetTeams()
        {
            List<TeamViewModel> teams = _leagueHandler.Teams.Select(x => _mapper.Map<TeamViewModel>(x)).ToList();
            return JsonConvert.SerializeObject(teams);
        }

        // GET api/league/news
        [HttpGet("news")]
        public object GetNews()
        {
            List<ArticleViewModel> articles = _leagueHandler.GetArticles().Select(a => _mapper.Map<ArticleViewModel>(a)).ToList();
            return JsonConvert.SerializeObject(articles);
        }

        // GET api/league/scoreboard
        [HttpGet("scoreboard")]
        public object GetScoreboard()
        {
            List<ScoreViewModel> articles = _leagueHandler.GetScoreboard().Select(a => _mapper.Map<ScoreViewModel>(a)).ToList();
            return JsonConvert.SerializeObject(articles);
        }

        // GET api/league/standings
        [HttpGet("standings")]
        public object GetStandings()
        {
            var teams = ParseStandings(ApiMediator.SendRequest(StandingsRequestBuilder("2019", "2020")));
            return JsonConvert.SerializeObject(teams);
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

        public List<GameViewModel> ParseViewModelGames(string answer)
        {
            List<GameViewModel> games = new List<GameViewModel>();
            var jsonObject = JObject.Parse(answer);
            foreach (var date in jsonObject["dates"])
            {
                foreach (var game in date["games"])
                {

                    if (game["gameType"].ToObject<string>() == "R")
                    {
                        games.Add(new GameViewModel
                        {
                            StartDate = DateTime.ParseExact(date["date"].ToString(), "yyyy-MM-dd", null),
                            Home = _mapper.Map<TeamViewModel>(_mediator.GetTeamById(int.Parse(game["teams"]["home"]["team"]["id"].ToString()))),
                            Away = _mapper.Map<TeamViewModel>(_mediator.GetTeamById(int.Parse(game["teams"]["away"]["team"]["id"].ToString())))
                        });
                    }
                }
            }
            return games;
        }

        public List<TeamViewModel> ParseStandings(string answer)
        {
            List<TeamViewModel> teams = new List<TeamViewModel>();
            var jsonObject = JObject.Parse(answer);
            foreach (var record in jsonObject["records"])
            {
                var division = record["division"]["nameShort"].ToString();
                var conference = record["conference"]["name"].ToString();
                foreach (var teamRecord in record["teamRecords"])
                {
                    var teamViewModel = _mapper.Map<TeamViewModel>(_mediator.GetTeamById(Int32.Parse(teamRecord["team"]["id"].ToString())));

                    teamViewModel.Wins = Int32.Parse(teamRecord["leagueRecord"]["wins"].ToString());
                    teamViewModel.Losses = Int32.Parse(teamRecord["leagueRecord"]["losses"].ToString());
                    teamViewModel.Ot = Int32.Parse(teamRecord["leagueRecord"]["ot"].ToString());
                    teamViewModel.GoalsScored = Int32.Parse(teamRecord["goalsScored"].ToString());
                    teamViewModel.GoalsAgainst = Int32.Parse(teamRecord["goalsAgainst"].ToString());
                    teamViewModel.Points = Int32.Parse(teamRecord["points"].ToString());
                    teamViewModel.Conference = conference;
                    teamViewModel.Division = division;
                    teamViewModel.DivisionRank = Int32.Parse(teamRecord["divisionRank"].ToString());
                    teamViewModel.ConferenceRank = Int32.Parse(teamRecord["conferenceRank"].ToString());
                    teamViewModel.LeagueRank = Int32.Parse(teamRecord["leagueRank"].ToString());
                    teamViewModel.GamesPlayed = Int32.Parse(teamRecord["gamesPlayed"].ToString());

                    teams.Add(teamViewModel);
                }
            }
            return teams;
        }
    }
}