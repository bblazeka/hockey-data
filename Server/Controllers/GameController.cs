using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
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
