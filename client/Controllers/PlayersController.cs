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
    }
}
