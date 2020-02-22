using AutoMapper;
using DataServer.Mediators;
using DataServer.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly IMapper _mapper;
        private DbMediator _mediator;

        public GameController(IMapper mapper)
        {
            _mapper = mapper;
            _mediator = new DbMediator();
        }

        // GET api/game/{date}?homeId={homeId}&awayId={awayId}
        [HttpGet("{date}")]
        public object Get(string date, int homeId, int awayId)
        {
            var dbGame = _mediator.GetGame(date, homeId, awayId);
            var game = new Game();
            game.ApiFetch(_mapper, dbGame.Id);
            return JsonConvert.SerializeObject(game);
        }
    }
}