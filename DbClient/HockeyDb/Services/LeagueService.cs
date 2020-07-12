using Dapper;
using HockeyDb.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace HockeyDb.Services
{
    public class LeagueService : DatabaseService
    {
        public LeagueService() : base() { }
        public List<TeamViewModel> GetLeagueTeams(object leagueObj, string season)
        {
            var league = (leagueObj as LeagueViewModel);
            var sql = @"SELECT a.LeagueId, a.LeagueName, b.SeasonId, c.TeamId, c.TeamName, c.TeamLogo, c.Country, d.Flag
                        FROM fan.Leagues a
                        INNER JOIN fan.TeamsSeason b on a.LeagueId = b.LeagueId
                        INNER JOIN fan.Teams c ON c.TeamId = b.TeamId
                        INNER JOIN fan.Nations d ON d.NationId = c.Country
                        WHERE a.LeagueId = @LeagueId and b.SeasonId = @Season";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                return connection.Query<LeagueViewModel, TeamLeagueViewModel, TeamViewModel, TeamViewModel>(
                    sql, (league, leagueTeam, team) => { leagueTeam.League = league; leagueTeam.Team = team; return team; }, new { LeagueId = league.LeagueId, Season = season }, splitOn: "LeagueId,SeasonId,TeamId").AsList();
            }
        }

    }
}
