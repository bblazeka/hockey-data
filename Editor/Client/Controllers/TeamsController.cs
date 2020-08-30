using DbServices.Models;
using DbServices.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Globalization;
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
            teams.Where(t => t.TeamLogo != null).ToList().ForEach(t => t.GenerateWebImages());
            return teams;
        }

        [HttpGet("{id}/{seasonId}")]
        public Team Get(int id, int seasonId)
        {
            Team t = ts.GetTeam(id);
            t.GenerateWebImages();
            t.Players = ts.GetPlayers(t, seasonId.ToString());
            t.Players.ForEach((player) =>
            {
                player.GenerateWebImages();
            });
            return t;
        }

        [HttpGet("search/{name}")]
        public List<Team> SearchTeam(string name)
        {
            CultureInfo culture = CultureInfo.CurrentCulture;
            List<Team> teams = ts.GetTeamsMatchingName(name);
            teams.ForEach(team => team.GenerateWebImages());

            return teams.Where(t => culture.CompareInfo.IndexOf(t.TeamName, name, CompareOptions.IgnoreCase) >= 0).ToList();
        }
    }
}
