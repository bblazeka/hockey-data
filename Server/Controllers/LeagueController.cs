using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Handlers;
using Server.Mediators;
using Server.Models;
using Server.ViewModels;
using System.Collections.Generic;
using System.Linq;

namespace Predictor.Controllers
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
            List<TeamViewData> teams = _leagueHandler.Teams.Select(x => _mapper.Map<TeamViewData>(x)).ToList();
            List<GameViewData> games = LeagueHandler.ParseViewModelGames(ApiMediator.SendRequest(ScheduleRequestBuilder(startDate, endDate)));

            foreach (TeamViewData team in teams)
            {
                team.RefreshData();
                team.Games = games.Where(g => g.Home.Id == team.Id || g.Away.Id == team.Id).ToList();
            }
            return teams;
        }

        // GET api/league/teams
        [HttpGet("teams")]
        public object GetTeams()
        {
            List<TeamViewData> teams = _leagueHandler.Teams.Select(x => _mapper.Map<TeamViewData>(x)).ToList();
            foreach (TeamViewData team in teams)
            {
                team.RefreshData();
            }
            return teams.ToList();
        }

        // GET api/league/standings
        [HttpGet("standings")]
        public object GetStandings()
        {
            var teams = LeagueHandler.ParseStandings(ApiMediator.SendRequest(StandingsRequestBuilder("2019", "2020")));
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
    }
}
