using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Models;

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
    }
}
