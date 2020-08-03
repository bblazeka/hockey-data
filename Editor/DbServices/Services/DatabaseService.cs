using Dapper;
using DbServices.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Text;

namespace DbServices.Services
{
    public class DatabaseService
    {
        protected SqlConnectionStringBuilder m_builder;
        protected List<Nation> m_nations;
        public DatabaseService()
        {
            m_builder = new SqlConnectionStringBuilder();
            m_builder.DataSource = DatabaseKeys.DATASOURCE;
            m_builder.UserID = DatabaseKeys.USER;
            m_builder.Password = DatabaseKeys.PASSWORD;
            m_builder.InitialCatalog = DatabaseKeys.INITIALCATALOG;

        }
        public List<Player> GetPlayers()
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var players = connection.Query<Player>("Select PlayerId, FullName, Position, Nation, Nation2, BirthPlace, Birthdate, Active, Comment from fan.Players order by FullName").AsList();
                return players;
            }
        }
        public List<Staff> GetStaff()
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var staff = connection.Query<Staff>("Select StaffId, FullName, Position, Nation, Nation2, BirthPlace, Birthdate from fan.Staff order by FullName").AsList();
                return staff;
            }
        }
        public List<Player> GetPlayersWithFlags()
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var players = connection.Query<Player>(@"Select PlayerId, FullName, Position, Active, Comment, Nation, n1.Flag Flag, Nation2, n2.Flag Flag2, BirthPlace, Birthdate 
                                                                  from fan.Players
                                                                  inner join fan.Nations n1 on n1.NationId = Nation left join fan.Nations n2 on n2.NationId = Nation2").AsList();
                return players;
            }
        }
        public List<Staff> GetStaffWithFlags()
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var staff = connection.Query<Staff>(@"Select StaffId, FullName, Position, Active, Nation, n1.Flag Flag, Nation2, n2.Flag Flag2, BirthPlace, Birthdate 
                                                                  from fan.Staff
                                                                  inner join fan.Nations n1 on n1.NationId = Nation left join fan.Nations n2 on n2.NationId = Nation2").AsList();
                return staff;
            }
        }
        public List<Team> GetTeams()
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var teams = connection.Query<Team>("Select TeamId, TeamName, TeamLogo, Country from fan.Teams order by TeamName").AsList();
                return teams;
            }
        }
        public List<League> GetLeagues()
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var leagues = connection.Query<League>("Select LeagueId, LeagueShort, LeagueName from fan.Leagues").AsList();
                return leagues;
            }
        }

        public List<Nation> GetNations()
        {
            if (m_nations != null)
            {
                return m_nations;
            }
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var nations = connection.Query<Nation>("Select NationId, NationName from fan.Nations order by NationId").AsList();
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
            "values (@PlayerId, @TeamId, @SeasonId)", new { PlayerId = playerId, ((Team)team).TeamId, SeasonId = season });
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
            "where PlayerId = @PlayerId and TeamId = @TeamId and SeasonId = @SeasonId", new { PlayerId = playerId, ((Team)team).TeamId, SeasonId = season });
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
