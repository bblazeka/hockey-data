using DbServices.Models;
using DbServices.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Globalization;
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
            player.PlayerSeasons.ForEach(ps => ps.Team.GenerateWebImages());
            player.GenerateWebImages();
            return player;
        }

        [HttpGet("search/{name}")]
        public Player SearchPlayer(string name)
        {
            CultureInfo culture = CultureInfo.CurrentCulture;
            List<Player> players = service.GetPlayers();
            
            Player foundPlayer = players.Where(p => culture.CompareInfo.IndexOf(p.FullName, name, CompareOptions.IgnoreCase) >= 0)
                .FirstOrDefault();
            return service.GetPlayer(foundPlayer.PlayerId);
        }

        [HttpPut("{id}")]
        public Task<IActionResult> Put(int id, [FromBody] Player player)
        {
            service.UpdatePlayer(player.Nation, player.FullName, player.Position, id, player.Nation2, player.BirthPlace, player.Birthdate, player.Active, player.Comment);
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
