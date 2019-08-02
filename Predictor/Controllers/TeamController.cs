using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SportPredictor.Handlers;
using SportPredictor.Models;

namespace Predictor.Controllers
{
    [Route("api/[controller]")]
    public class TeamController : Controller
    {

        public TeamController()
        {
            // empty for now
        }

        // GET api/team/{id}
        [HttpGet("{id}")]
        public object Get(string id)
        {
            return JsonConvert.SerializeObject(new Team(int.Parse(id)));
        }

        // PUT api/team/update
        [HttpGet("update")]
        public void Get()
        {
            DatabaseHandler handler = new DatabaseHandler();
            handler.UpdateTeams();
        }
    }
}
