using AutoMapper;
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

        public GameController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET api/game/{id}
        [HttpGet("{id}")]
        public object Get(string id)
        {
            var game = new Game();
            game.ApiFetch(_mapper, id);
            return JsonConvert.SerializeObject(game);
        }
    }
}