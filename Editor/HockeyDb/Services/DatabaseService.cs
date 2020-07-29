using Dapper;
using HockeyDb.Models;
using HockeyDb.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Text;

namespace HockeyDb.Services
{
    public class DatabaseService
    {
        protected SqlConnectionStringBuilder m_builder;
        protected List<NationViewModel> m_nations;
        public DatabaseService()
        {
            m_builder = new SqlConnectionStringBuilder();
            m_builder.DataSource = DatabaseKeys.DATASOURCE;
            m_builder.UserID = DatabaseKeys.USER;
            m_builder.Password = DatabaseKeys.PASSWORD;
            m_builder.InitialCatalog = DatabaseKeys.INITIALCATALOG;

        }
        public List<PlayerViewModel> GetPlayers()
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var players = connection.Query<PlayerViewModel>("Select PlayerId, FullName, Position, Nation, Nation2, BirthPlace, Birthdate from fan.Players order by FullName").AsList();
                return players;
            }
        }
        public List<PlayerViewModel> GetPlayersWithFlags()
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var players = connection.Query<PlayerViewModel>(@"Select PlayerId, FullName, Position, Nation, n1.Flag Flag, Nation2, n2.Flag Flag2, BirthPlace, Birthdate 
                                                                  from fan.Players
                                                                  inner join fan.Nations n1 on n1.NationId = Nation left join fan.Nations n2 on n2.NationId = Nation2").AsList();
                return players;
            }
        }
        public List<TeamViewModel> GetTeams()
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var teams = connection.Query<TeamViewModel>("Select TeamId, TeamName, TeamLogo, Country from fan.Teams order by TeamName").AsList();
                return teams;
            }
        }
        public List<LeagueViewModel> GetLeagues()
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var leagues = connection.Query<LeagueViewModel>("Select LeagueId, LeagueName from fan.Leagues").AsList();
                return leagues;
            }
        }

        public List<NationViewModel> GetNations()
        {
            if (m_nations != null)
            {
                return m_nations;
            }
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var nations = connection.Query<NationViewModel>("Select NationId, NationName from fan.Nations order by NationId").AsList();
                m_nations = nations;
                return nations;
            }
        }

        public int AddPlayerTeam(int playerId, string FullName, object team, int season)
        {
            try
            {

                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {
                    var teams = connection.Query<Team>("Select TeamId, TeamName from fan.Teams").AsList();
                    var players = connection.Query<Player>("Select PlayerId, FullName from fan.Players").AsList();

                    if (playerId == 0)
                    {
                        playerId = players.Find(el => el.FullName == FullName).PlayerId;
                    }

                    var affectedRows = connection.Execute("Insert into fan.PlayersTeams (PlayerId, TeamId, SeasonId) " +
            "values (@PlayerId, @TeamId, @SeasonId)", new { PlayerId = playerId, ((TeamViewModel)team).TeamId, SeasonId = season });
                    return affectedRows;
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
        }

        public int DeletePlayerTeam(int playerId, string FullName, object team, int season)
        {
            try
            {

                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {
                    var teams = connection.Query<Team>("Select TeamId, TeamName from fan.Teams").AsList();
                    var players = connection.Query<Player>("Select PlayerId, FullName from fan.Players").AsList();

                    if (playerId == 0)
                    {
                        playerId = players.Find(el => el.FullName == FullName).PlayerId;
                    }

                    var affectedRows = connection.Execute("Delete from fan.PlayersTeams " +
            "where PlayerId = @PlayerId and TeamId = @TeamId and SeasonId = @SeasonId", new { PlayerId = playerId, ((TeamViewModel)team).TeamId, SeasonId = season });
                    return affectedRows;
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
        }

        public int UpdateNatFlag(string path, object natId)
        {
            byte[] bytes = File.ReadAllBytes(path);
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var affectedRows = connection.Execute("update fan.Nations set Flag = @Logo " +
        "where NationId = @NationId", new { Logo = bytes, NationId = natId });
                return affectedRows;
            }
        }
    }
}
