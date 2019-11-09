using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Models;
using Server.ViewModels;
using System.Collections.Generic;
using System.Linq;

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
            var team = new Team(int.Parse(id));
            return JsonConvert.SerializeObject(Convert(team));
        }

        private TeamViewData Convert(Team team) {
            var teamViewData = _mapper.Map<TeamViewData>(team);
            teamViewData.Skaters = team.Players.Where(player => player.Position != "G").OrderByDescending(p => ((Skater)p).Points).Select(x => _mapper.Map<SkaterViewData>(x)).ToList();
            teamViewData.Goalies = team.Players.Where(player => player.Position == "G").Select(x => _mapper.Map<GoalieViewData>(x)).ToList();
            return teamViewData;
        }
    }
}
