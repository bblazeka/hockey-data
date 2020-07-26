using Client.Models;
using Client.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private TeamService ts;
        private readonly ILogger<TeamsController> _logger;

        public TeamsController(ILogger<TeamsController> logger)
        {
            ts = new TeamService();
            _logger = logger;
        }

        [HttpGet]
        public List<Team> Get()
        {
            var teams = ts.GetTeams();
            teams.Where(t => t.TeamLogo != null).ToList().ForEach(t => t.GenerateWebLogo());
            return teams;
        }

        [HttpGet("{id}/{seasonId}")]
        public Team Get(int id, int seasonId)
        {
            Team t = ts.GetTeam(id);
            t.GenerateWebLogo();
            t.Players = ts.GetPlayers(t, seasonId.ToString());
            return t;
        }
    }
}
