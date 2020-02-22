using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using AutoMapper;
using DataServer.Models;
using DataServer.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using DataServer.Mediators;

namespace DataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly IMapper _mapper;
        private DbMediator _mediator;

        public TeamController(IMapper mapper)
        {
            _mapper = mapper;
            _mediator = new DbMediator();
        }

        // GET api/team/{id}
        [HttpGet("{id}")]
        public object Get(string id)
        {
            //var team = new Team(int.Parse(id));
            var team = Convert(_mediator.GetFromDb(int.Parse(id)));
            return JsonConvert.SerializeObject(team);
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