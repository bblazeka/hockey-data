using Dapper;
using HockeyDb.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace HockeyDb.Services
{
    public class PlayerService : DatabaseService
    {
        public PlayerService() : base() { }
        public List<PlayerSeasonViewModel> GetPlayerSeasons(object playerObj)
        {
            var player = (playerObj as PlayerViewModel);
            var sql = @"SELECT a.PlayerId, a.FullName, a.Position, b.SeasonId, b.Nr, b.Games GP, b.Goals, b.Assists, b.Goals + b.Assists Points, b.PIM, b.PlusMinus, b.GoalsAgainstAvg, b.SavesPercent, c.TeamId, c.TeamName, c.TeamLogo, e.LeagueId, e.LeagueName 
                        FROM fan.Players a
                        INNER JOIN fan.PlayersTeams b on a.PlayerId = b.PlayerId
                        INNER JOIN fan.Teams c ON c.TeamId = b.TeamId
                        INNER JOIN fan.TeamsSeason d ON c.TeamId = d.TeamId and b.SeasonId = d.SeasonId
                        INNER JOIN fan.Leagues e ON e.LeagueId = d.LeagueId
                        WHERE a.PlayerId = @PlayerId
                        ORDER BY b.seasonId";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var res = connection.Query<PlayerViewModel, PlayerSeasonViewModel, TeamViewModel, LeagueViewModel, PlayerSeasonViewModel>(
                    sql, (player, playerSeason, team, league) => { playerSeason.Player = player; playerSeason.Team = team; playerSeason.League = league; return playerSeason; }, new { PlayerId = player.PlayerId }, splitOn: "PlayerId,SeasonId,TeamId,LeagueId").AsList();
                return res;
            }
        }
        public int UpdatePlayer(string nation, string position, int playerId, string nation2, string birthplace, DateTime birthdate)
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var affectedRows = connection.Execute("UPDATE fan.Players SET Nation = @nation, position = @position, nation2 = @nation2, birthplace = @birthplace, birthdate = @birthdate " +
                "where playerId = @PlayerId", new { nation, position, PlayerId = playerId, nation2, birthplace, birthdate });
                return affectedRows;
            }
        }
        public int UpdatePlayerSeason(int seasonId, int playerId, int teamId, int Nr, int GP, int G, int A, int PIM, decimal GAA, decimal Svs)
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var affectedRows = connection.Execute("UPDATE fan.PlayersTeams SET Games = @GP, Nr = @Nr, Goals = @G, Assists = @A, PIM = @PIM, GoalsAgainstAvg = @GAA, SavesPercent = @Svs " +
                "where playerId = @PlayerId and teamId = @TeamId and seasonId = @SeasonId", new { GP, Nr, G, A, PIM, GAA, Svs, PlayerId = playerId, TeamId = teamId, SeasonId = seasonId });
                return affectedRows;
            }
        }
        public int InsertPlayer(string id, string name, string pos, string nat)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {

                    var affectedRows = connection.Execute("Insert into fan.Players (PlayerId, FullName, Position, Nation) " +
                                "values (@Id, @Name, @Pos, @Nat)", new { Id = id, Name = name, Pos = pos, Nat = nat });
                    return affectedRows;
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.Message);
                return -1;
            }
        }
    }
}
