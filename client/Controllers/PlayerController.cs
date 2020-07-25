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

        [HttpGet]
        public Player Get(int id)
        {
            return service.GetPlayers().Where(p => p.PlayerId == id).First();
        }
    }
}
