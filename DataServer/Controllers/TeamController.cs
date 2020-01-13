using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DataServer.Models;
using DataServer.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
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

        private TeamViewModel Convert(Team team)
        {
            var teamViewData = _mapper.Map<TeamViewModel>(team);
            teamViewData.Skaters = team.Players.Where(player => player.Position != "G").OrderByDescending(p => ((Skater)p).Points).Select(x => _mapper.Map<SkaterViewModel>(x)).ToList();
            teamViewData.Goalies = team.Players.Where(player => player.Position == "G").Select(x => _mapper.Map<GoalieViewModel>(x)).ToList();
            return teamViewData;
        }
    }
}