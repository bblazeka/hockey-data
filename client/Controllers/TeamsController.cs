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
    [Route("[controller]")]
    public class TeamsController : ControllerBase
    {
        private TeamService ts;
        private readonly ILogger<TeamsController> _logger;

        public TeamsController(ILogger<TeamsController> logger)
        {
            ts = new TeamService();
            _logger = logger;
        }

        /*[HttpGet]
        public List<Team> Get()
        {
            return ts.GetTeams();
        }*/

        [HttpGet]
        public Team Get(int id)
        {
            Team t = ts.GetTeams().Where(t => t.TeamId == 1895).First();
            t.Players = ts.GetPlayers(t, "20202021");
            return t;
        }
    }
}
