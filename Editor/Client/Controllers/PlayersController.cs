using DbServices.Models;
using DbServices.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private PlayerService service;
        private readonly ILogger<TeamsController> _logger;

        public PlayersController(ILogger<TeamsController> logger)
        {
            service = new PlayerService();
            _logger = logger;
        }

        [HttpGet]
        public List<Player> Get()
        {
            return service.GetPlayers();
        }

        [HttpGet("{id}")]
        public Player Get(int id)
        {
            Player player = service.GetPlayer(id);
            player.PlayerSeasons = service.GetPlayerSeasons(player);
            player.PlayerSeasons.ForEach(ps => ps.Team.GenerateWebLogo());
            return player;
        }

        [HttpGet("search/{name}")]
        public Player SearchPlayer(string name)
        {
            List<Player> players = service.GetPlayers();
            
            return players.Where(p => p.FullName.Contains(name)).First();
        }

        [HttpPut("{id}")]
        public Task<IActionResult> Put(int id, [FromBody] Player player)
        {
            service.UpdatePlayer(player.Nation, player.Position, id, player.Nation2, player.BirthPlace, player.Birthdate);
            return null;
        }

        [HttpPut("season/{id}")]//?name={name}&teamId={teamId}&seasonId={seasonId}")]
        public Task<IActionResult> Put(int id, string name, int teamId, int seasonId)
        {
            service.AddPlayerTeam(id, name, teamId, seasonId);
            return null;
        }
    }
}
