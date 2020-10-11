using DataServer.Models;
using Dapper;
using System.Data.SqlClient;
using System.Linq;
using System.Collections.Generic;
using System;

namespace DataServer.Mediators
{

    public class DbMediator
    {
        private SqlConnectionStringBuilder builder;

        public DbMediator()
        {
            builder = new SqlConnectionStringBuilder();
            builder.DataSource = DatabaseKeys.DATASOURCE;
            builder.UserID = DatabaseKeys.USER;
            builder.Password = DatabaseKeys.PASSWORD;
            builder.InitialCatalog = DatabaseKeys.INITIALCATALOG;
        }

        public Team GetFromDb(int id)
        {
            var team = new Team();
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<Player>(
                    string.Format("select * from Players where TeamId = {0}", id)).ToList();
                foreach (var p in res)
                {
                    var position = p.Position;
                    if (position == "G")
                    {
                        team.Players.Add(new Goalie(p.PlayerId));
                    }
                    else
                    {
                        team.Players.Add(new Skater(p.PlayerId));
                    }
                }
            }
            return team;
        }

        public List<Player> GetPlayersByName(string name)
        {
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<Player, Team, Player>(
                    string.Format("select * from Players left join Teams on Players.TeamId = Teams.Id where Players.name like '%{0}%'", name), (player, team) => { player.Team = team; return player; }).ToList();
                return res;
            }
        }

        public List<Team> GetTeams()
        {
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<Team>("select * from Teams where active = 1 order by name").ToList();
                return res;
            }
        }

        public List<Game> GetGames()
        {
            var sql = @"select * from Games 
                        left join Teams t1 on Games.HomeID = t1.Id
                        left join Teams t2 on Games.AwayId = t2.Id";
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<Game, Team, Team, Game>(
                    sql, (game, home, away) => { game.Home = home; game.Away = away; return game; }).ToList();
                return res;
            }
        }

        public List<Team> GetTeamsByName(string name)
        {
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<Team>(
                    string.Format("select * from Teams where fullname like '%{0}%' and active = 1", name)).ToList();
                return res;
            }
        }

        public Team GetTeamById(int id)
        {
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<Team>(
                    string.Format("select * from Teams where Id = {0}", id)).First();
                return res;
            }
        }

        public Game GetGame(string date, int homeId, int awayId) 
        {
            var dictionary = new Dictionary<string, object>
            {
                { "@HomeId", homeId},
                { "@AwayId", awayId}
            };
            var parameters = new DynamicParameters(dictionary);
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var res = connection.Query<Game, Team, Team, Game>(
                    @"select * from Games 
                    inner join Teams h on h.Id = Games.HomeID
                    inner join Teams a on a.Id = Games.AwayID 
                    where HomeId = @HomeId and AwayId = @AwayId", 
                    map: (game, home, away) => { game.Home = home; game.Away = away; return game; },
                    splitOn: "GameId,Id,Id",
                    param: parameters );
                // filter by date
                return res.FirstOrDefault();
            }
        }

        public List<Game> GetGames(string startDate, string endDate)
        {
            var games = new List<Game>();
            var dictionary = new Dictionary<string, object>
            {
                { "@Start", DateTime.ParseExact(startDate, "yyyy-MM-dd", null)},
                { "@End", (endDate != null) ? 
                DateTime.ParseExact(endDate, "yyyy-MM-dd", null)
                : 
                DateTime.ParseExact(startDate, "yyyy-MM-dd", null)}
            };
            var parameters = new DynamicParameters(dictionary);
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                var query = @"select * from Games 
                    inner join Teams h on h.Id = Games.HomeID
                    inner join Teams a on a.Id = Games.AwayID 
                 where DatePlayed >= @Start and DatePlayed <= @End";
                var res = connection.Query<Game, Team, Team, Game>(query,
                    map: (game, home, away) => { game.Home = home; game.Away = away; return game; },
                    splitOn: "GameId,Id,Id",
                    param: parameters ).ToList();
                return res;
            }
        }
    }
}
