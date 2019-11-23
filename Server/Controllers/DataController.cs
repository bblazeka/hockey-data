using AutoMapper;
using LiteDB;
using Dapper;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Server.Handlers;
using Server.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        private SqlConnectionStringBuilder builder;

        public DataController()
        {
            builder = new SqlConnectionStringBuilder();
            builder.DataSource = DatabaseKeys.DATASOURCE; 
            builder.UserID = DatabaseKeys.USER;            
            builder.Password = DatabaseKeys.PASSWORD;     
            builder.InitialCatalog = DatabaseKeys.INITIALCATALOG;
        }

        // GET api/data/player/search/{name}
        [HttpGet("player/search/{name}")]
        public object Player(string name)
        {
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<PlayerViewData, TeamViewData, PlayerViewData>(
                    string.Format("select * from Players left join Teams on Players.TeamId = Teams.Id where Players.name like '%{0}%'", name), (player, team) => { player.Team = team; return player;}).ToList();
                return res;
            }
        }

        // GET api/data/teams
        [HttpGet("teams")]
        public object Teams()
        {
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<TeamViewData>("select * from Teams where active = 1 order by name").ToList();
                return res;
            }
        }

        // GET api/data/games
        [HttpGet("games")]
        public object Games(string name)
        {
            var sql = @"select * from Games 
                        left join Teams t1 on Games.HomeID = t1.Id
                        left join Teams t2 on Games.AwayId = t2.Id";
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<GameViewData, TeamViewData, TeamViewData, GameViewData>(
                    sql, (game, home, away) => { game.Home = home; game.Away = away; return game;}).ToList();
                return res;
            }
        }

        // GET api/data/team/search/{name}
        [HttpGet("team/search/{name}")]
        public object Team(string name)
        {
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<TeamViewData>(
                    string.Format("select * from Teams where name like '%{0}%'", name)).ToList();
                return res;
            }
        }

        [HttpGet("team/{id}")]
        public object Team(int id)
        {
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<TeamViewData>(
                    string.Format("select * from Teams where Id = {0}", id));
                return res;
            }
        }
    }
}
