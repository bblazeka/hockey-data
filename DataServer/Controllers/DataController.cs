using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using AutoMapper;
using Newtonsoft.Json;
using DataServer.Mediators;
using DataServer.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly IMapper _mapper;
        private DbMediator _mediator;

        public DataController(IMapper mapper)
        {
            _mapper = mapper;
            _mediator = new DbMediator();
        }

        // GET api/data/player/search/{name}
        [HttpGet("player/search/{name}")]
        public object Player(string name)
        {
            return _mediator.GetPlayersByName(name).Select(p => _mapper.Map<PlayerViewModel>(p));
        }

        // GET api/data/teams
        [HttpGet("teams")]
        public object Teams()
        {
            List<TeamViewModel> teams = _mediator.GetTeams().Select(x => _mapper.Map<TeamViewModel>(x)).ToList();
            return JsonConvert.SerializeObject(teams);
        }
        
        // GET api/data/teams/dropdown
        [HttpGet("teams/dropdown")]
        public object GetTeamsForDropdown()
        {
            List<DropdownViewModel> teams = _mediator.GetTeams().Select(x => _mapper.Map<DropdownViewModel>(x)).ToList();
            return JsonConvert.SerializeObject(teams);
        }


        // GET api/data/games
        [HttpGet("games")]
        public object Games(string name)
        {
            return JsonConvert.SerializeObject(_mediator.GetGames());
        }

        // GET api/data/team/search/{name}
        [HttpGet("team/search/{name}")]
        public object Team(string name)
        {
            return JsonConvert.SerializeObject(_mapper.Map<TeamViewModel>(_mediator.GetTeamsByName(name).Single()));
        }

        [HttpGet("team/{id}")]
        public object Team(int id)
        {
            return JsonConvert.SerializeObject(_mapper.Map<TeamViewModel>(_mediator.GetTeamById(id)));
        }
    }
}