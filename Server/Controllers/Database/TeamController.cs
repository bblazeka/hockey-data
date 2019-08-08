using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SportPredictor.Handlers;
using Newtonsoft.Json;
using SportPredictor.Databases;

namespace Predictor.Controllers.Database
{
    [Route("db/[controller]")]
    public class TeamController : Controller
    {
        private DatabaseHandler _handler;

        public TeamController() {

            _handler = new DatabaseHandler(new PostgreSQLDatabase());
        }

        // db/team
        [HttpGet()]
        public object Get()
        {
            string name = HttpContext.Request.Query["name"].ToString();
            return JsonConvert.SerializeObject(_handler.GetTeam(name));
        }
    }
}
