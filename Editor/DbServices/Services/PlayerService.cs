using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using DbServices.Models;

namespace DbServices.Services
{
    public class PlayerService : DatabaseService
    {
        public PlayerService() : base() { }

        public Player GetPlayer(int playerId)
        {
            var sql = @"SELECT * FROM fan.Players a
                        WHERE a.PlayerId = @playerId";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var res = connection.Query<Player>(sql, new { playerId }).ToList().First();
                return res;
            }
        }

        public List<PlayerSeason> GetPlayerSeasons(object playerObj)
        {
            var player = (playerObj as Player);
            if (player == null)
            {
                return new List<PlayerSeason>();
            }
            var sql = @"SELECT a.PlayerId, a.FullName, a.Position, a.Active, a.Comment, b.SeasonId, b.SequNo, b.Nr, b.Games GP, b.Goals, b.Assists, b.Goals + b.Assists Points, b.PIM, b.PlusMinus, b.GoalsAgainstAvg, b.SavesPercent, c.TeamId, c.TeamName, c.TeamLogo, f.Flag, e.LeagueId, e.LeagueShort 
                        FROM fan.Players a
                        INNER JOIN fan.PlayersTeams b on a.PlayerId = b.PlayerId
                        INNER JOIN fan.Teams c ON c.TeamId = b.TeamId
                        INNER JOIN fan.TeamsSeason d ON c.TeamId = d.TeamId and b.SeasonId = d.SeasonId
                        INNER JOIN fan.Leagues e ON e.LeagueId = d.LeagueId
                        INNER JOIN fan.Nations f ON f.NationId = c.Country
                        WHERE a.PlayerId = @PlayerId
                        ORDER BY b.seasonId, b.SequNo";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var res = connection.Query<Player, PlayerSeason, Team, League, PlayerSeason>(
                    sql, (player, playerSeason, team, league) => { playerSeason.Player = player; playerSeason.Team = team; playerSeason.League = league; return playerSeason; }, new { PlayerId = player.PlayerId }, splitOn: "PlayerId,SeasonId,TeamId,LeagueId").AsList();
                return res;
            }
        }
        public int UpdatePlayer(string nation, string fullName, string position, int playerId, string nation2, string birthplace, DateTime birthdate, bool active, string comment)
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var affectedRows = connection.Execute("UPDATE fan.Players SET Nation = @nation, position = @position, nation2 = @nation2, birthplace = @birthplace, birthdate = @birthdate, fullName = @fullName, active = @active, comment = @comment " +
                "where playerId = @PlayerId", new { nation, fullName, position, PlayerId = playerId, nation2, birthplace, birthdate, active, comment });
                return affectedRows;
            }
        }
        public int UpdatePlayerSeason(int seasonId, int sequNo, int playerId, int teamId, int Nr, int GP, int G, int A, int PIM, decimal GAA, decimal Svs)
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var affectedRows = connection.Execute("UPDATE fan.PlayersTeams SET Games = @GP, Nr = @Nr, Goals = @G, Assists = @A, PIM = @PIM, GoalsAgainstAvg = @GAA, SavesPercent = @Svs, SequNo = @SequNo " +
                "where playerId = @PlayerId and teamId = @TeamId and seasonId = @SeasonId", new { GP, Nr, G, A, PIM, GAA, Svs, PlayerId = playerId, TeamId = teamId, SeasonId = seasonId, SequNo = sequNo });
                return affectedRows;
            }
        }
        public int InsertPlayer(string id, string name, string pos, string nat, string birthplace, DateTime birthdate)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {

                    var affectedRows = connection.Execute("Insert into fan.Players (PlayerId, FullName, Position, Nation, BirthPlace, Birthdate) " +
                                "values (@Id, @Name, @Pos, @Nat, @Birthplace, @Birthdate)", 
                                new { Id = id, Name = name, Pos = pos, Nat = nat, Birthplace = birthplace, Birthdate = birthdate });
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
