using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayerController : ControllerBase
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
            }
            catch (Exception)
            {
                var player = new Goalie(int.Parse(id));
                return JsonConvert.SerializeObject(player);
            }
        }
    }
}