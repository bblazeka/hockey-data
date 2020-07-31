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
    public class LeaguesController : ControllerBase
    {
        private LeagueService service;
        private readonly ILogger<LeaguesController> _logger;

        public LeaguesController(ILogger<LeaguesController> logger)
        {
            service = new LeagueService();
            _logger = logger;
        }

        [HttpGet]
        public List<League> Get()
        {
            var leagues = service.GetLeagues();
            return leagues;
        }
    }
}
