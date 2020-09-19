using Dapper;
using DbServices.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace DbServices.Services
{
    public class LeagueService : DatabaseService
    {
        public LeagueService() : base() { }
        public List<TeamSeason> GetLeagueTeams(object leagueObj, string season)
        {
            var league = (leagueObj as League);
            var sql = @"SELECT a.LeagueId, a.LeagueShort, a.LeagueName, b.SeasonId, b.Division, b.Done, c.TeamId, c.TeamName, c.TeamLogo, c.Country, d.Flag
                        FROM fan.Leagues a
                        INNER JOIN fan.TeamsSeason b on a.LeagueId = b.LeagueId
                        INNER JOIN fan.Teams c ON c.TeamId = b.TeamId
                        INNER JOIN fan.Nations d ON d.NationId = c.Country
                        WHERE a.LeagueId = @LeagueId and b.SeasonId = @Season
                        ORDER BY Division desc";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                return connection.Query<League, TeamSeason, Team, TeamSeason>(
                    sql, (league, leagueTeam, team) => { leagueTeam.League = league; leagueTeam.Team = team; return leagueTeam; }, new { LeagueId = league.LeagueId, Season = season }, splitOn: "LeagueId,SeasonId,TeamId").AsList();
            }
        }

        public int InsertLeague(string id, string shortName, string fullName)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {
                    var affectedRows = connection.Execute("Insert into fan.Leagues (LeagueId, LeagueShort, LeagueName) " +
                                "values (@Id, @Short, @Name)", new { Id = id, Short = shortName, Name = fullName });
                    return affectedRows;
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
        }

    }
}
