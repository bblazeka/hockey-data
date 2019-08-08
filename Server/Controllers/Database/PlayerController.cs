using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SportPredictor.Handlers;
using SportPredictor.Databases;
using Newtonsoft.Json;

namespace Predictor.Controllers.Database
{
    [Route("db/[controller]")]
    public class PlayerController : Controller
    {
        private DatabaseHandler _handler;

        public PlayerController() {
            _handler = new DatabaseHandler(new PostgreSQLDatabase());
        }

        // db/player
        [HttpGet()]
        public object Get()
        {
            string name = HttpContext.Request.Query["name"].ToString();
            return JsonConvert.SerializeObject(_handler.GetPlayer(name));
        }

        // GET db/player/{id}
        [HttpGet("{id}")]
        public object GetWithId(int id)
        {
            return JsonConvert.SerializeObject(_handler.GetPlayer(id));
        }
    }
}
