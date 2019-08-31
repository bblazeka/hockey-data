using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Handlers;
using Server.Models;

namespace Predictor.Controllers
{
    [Route("api/[controller]")]
    public class LeagueController : Controller
    {
        private LeagueHandler _leagueHandler;
        public LeagueController()
        {
            _leagueHandler = new LeagueHandler(new TeamHandler());
        }

        // GET api/league/schedule/{startDate}
        [HttpGet("schedule/{startDate}")]
        public object GetSchedule(string startDate, string endDate)
        {
            var teams = _leagueHandler.GetTeamsSchedule(startDate,endDate);
            return teams;
        }
    }
}
