using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Models;

namespace Predictor.Controllers
{
    [Route("api/[controller]")]
    public class TeamController : Controller
    {
        private readonly IMapper _mapper;

        public TeamController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET api/team/{id}
        [HttpGet("{id}")]
        public object Get(string id)
        {
            return JsonConvert.SerializeObject(new Team(int.Parse(id)));
        }
    }
}
