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
    public class PlayerController : Controller
    {
        private readonly IMapper _mapper;

        public PlayerController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET api/player/{id}
        [HttpGet("{id}")]
        public object Get(string id)
        {
            try
            {
                var player = new Skater(int.Parse(id));
                return JsonConvert.SerializeObject(player);
            } catch (Exception)
            {
                var player = new Goalie(int.Parse(id));
                return JsonConvert.SerializeObject(player);
            }
        }
    }
}
