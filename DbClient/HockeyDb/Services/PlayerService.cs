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
            // divide by positions
            var goalies = players.Where(el => el.Position.Equals("G")).OrderByDescending(e => e.Games).ToList();
            List<PlayerViewModel> skaters = players.Where(el => !el.Position.Equals("G"))
                .OrderByDescending(e => (float)e.Points/e.Games).ToList();

            // determine positional compatibility
            skaters.ForEach(el => el.DeterminePositionalCompatibility());

            int defCount = skaters.Where(s => s.positionalCompatibility.D).Count();
            int fwdCount = skaters.Where(s => !s.positionalCompatibility.D).Count();

            int linesCount = (defCount / 2 < fwdCount / 3) ? defCount / 2 : fwdCount / 3;

            // fill output list
            List<PlayerViewModel> ps = new List<PlayerViewModel>();
            if (goalies.Count > 0)
            {
                PlayerViewModel g = goalies.First();
                goalies.Remove(g);
                ps.Add(g);

                if (goalies.Count >= 1)
                {
                    g = goalies.First();
                    goalies.Remove(g);
                    ps.Add(g);
                }

                ps.Add(new PlayerViewModel());

                // generate only two lines
                for (int line = 0; line < linesCount; line++)
                {
                    PlayerViewModel ld = GetNextDefender(skaters);
                    skaters.Remove(ld);
                    ps.Add(ld);
                    PlayerViewModel rd = GetNextDefender(skaters);
                    skaters.Remove(rd);
                    ps.Add(rd);

                    // count occurances to determine the order of assignment
                    int lwCount = skaters.Where(el => el.positionalCompatibility.LW == true).ToList().Count;
                    int cCount = skaters.Where(el => el.positionalCompatibility.C == true).ToList().Count;
                    int rwCount = skaters.Where(el => el.positionalCompatibility.RW == true).ToList().Count;

                    if (rwCount < lwCount)
                    {
                        PlayerViewModel rw = GetNextRightWing(skaters);
                        PlayerViewModel c = GetNextCenter(skaters);
                        PlayerViewModel lw = GetNextLeftWing(skaters);

                        ps.Add(lw);
                        ps.Add(c);
                        ps.Add(rw);
                    }
                    else
                    {
                        PlayerViewModel lw = GetNextLeftWing(skaters);
                        PlayerViewModel c = GetNextCenter(skaters);
                        PlayerViewModel rw = GetNextRightWing(skaters);

                        ps.Add(lw);
                        ps.Add(c);
                        ps.Add(rw);
                    }

                    ps.Add(new PlayerViewModel());
                }
            }

            return ps;
        }

        public static PlayerViewModel GetNextDefender(List<PlayerViewModel> players)
        {
            PlayerViewModel d = new PlayerViewModel();

            try
            {
                d = players.First(el => el.positionalCompatibility.D == true);
            }
            catch (InvalidOperationException)
            {
                d = players.First();
            }
            players.Remove(d);

            return d;
        }

        public static PlayerViewModel GetNextCenter(List<PlayerViewModel> players)
        {
            PlayerViewModel c = new PlayerViewModel();

            try
            {
                c = players.First(el => el.positionalCompatibility.C == true);
            }
            catch (InvalidOperationException)
            {
                c = players.First();
            }
            players.Remove(c);

            return c;
        }

        public static PlayerViewModel GetNextLeftWing(List<PlayerViewModel> players)
        {
            PlayerViewModel p = new PlayerViewModel();

            try
            {
                p = players.First(el => el.positionalCompatibility.LW == true);
            }
            catch (InvalidOperationException)
            {
                p = players.First();
            }
            players.Remove(p);

            return p;
        }

        public static PlayerViewModel GetNextRightWing(List<PlayerViewModel> players)
        {
            PlayerViewModel p = new PlayerViewModel();

            try
            {
                p = players.First(el => el.positionalCompatibility.RW == true);
            }
            catch (InvalidOperationException)
            {
                p = players.First();
            }
            players.Remove(p);

            return p;
        }
    }
}
