using Dapper;
using HockeyDb.Models;
using HockeyDb.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;

namespace HockeyDb.Services
{
    public class PlayerService : DatabaseService
    {
        public PlayerService() : base() { }
        public List<PlayerSeasonViewModel> GetPlayerSeasons(object playerObj)
        {
            var player = (playerObj as PlayerViewModel);
            if (player == null)
            {
                return new List<PlayerSeasonViewModel>();
            }
            var sql = @"SELECT a.PlayerId, a.FullName, a.Position, b.SeasonId, b.Nr, b.Games GP, b.Goals, b.Assists, b.Goals + b.Assists Points, b.PIM, b.PlusMinus, b.GoalsAgainstAvg, b.SavesPercent, c.TeamId, c.TeamName, c.TeamLogo, f.Flag, e.LeagueId, e.LeagueName 
                        FROM fan.Players a
                        INNER JOIN fan.PlayersTeams b on a.PlayerId = b.PlayerId
                        INNER JOIN fan.Teams c ON c.TeamId = b.TeamId
                        INNER JOIN fan.TeamsSeason d ON c.TeamId = d.TeamId and b.SeasonId = d.SeasonId
                        INNER JOIN fan.Leagues e ON e.LeagueId = d.LeagueId
                        INNER JOIN fan.Nations f ON f.NationId = c.Country
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

        public static List<PlayerViewModel> GetLineup(List<PlayerViewModel> players)
        {
            // divide by defenders and forwards
            var defenders = players.Where(el => el.Position.Equals("D")).OrderByDescending(e => (float)e.Points/e.Games).ToList();
            List<PlayerViewModel> forwards = players.Where(el => !el.Position.Equals("D") && !el.Position.Equals("G"))
                .OrderByDescending(e => (float)e.Points / e.Games).ToList();

            // determine positional compatibility for forwards
            forwards.ForEach(el => el.DeterminePositionalCompatibility());

            // fill output list
            List<PlayerViewModel> ps = new List<PlayerViewModel>();
            if (defenders.Count >= 4 && forwards.Count >= 6)
            {
                // generate only two lines
                for (int line = 0; line < 2; line++)
                {
                    PlayerViewModel ld = defenders.First();
                    defenders.Remove(ld);
                    ps.Add(ld);
                    PlayerViewModel rd = defenders.First();
                    defenders.Remove(rd);
                    ps.Add(rd);

                    PlayerViewModel c = new PlayerViewModel();
                    try
                    {
                        c = forwards.First(el => el.positionalCompatibility.C == true);
                    }
                    catch (InvalidOperationException)
                    {
                        c = forwards.First();
                    }
                    forwards.Remove(c);

                    PlayerViewModel lw = new PlayerViewModel();
                    try
                    {
                        lw = forwards.First(el => el.positionalCompatibility.LW == true);
                    }
                    catch (InvalidOperationException)
                    {
                        lw = forwards.First();
                    }
                    forwards.Remove(lw);

                    PlayerViewModel rw = new PlayerViewModel();
                    try
                    {
                        rw = forwards.First(el => el.positionalCompatibility.RW == true);
                    }
                    catch (InvalidOperationException)
                    {
                        rw = forwards.First();
                    }
                    forwards.Remove(rw);


                    ps.Add(lw);
                    ps.Add(c);
                    ps.Add(rw);
                }
            }

            return ps;
        }
    }
}
