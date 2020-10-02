using Dapper;
using System;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.IO;
using DbServices.Models;
using System.Linq;

namespace DbServices.Services
{
    public class TeamService : DatabaseService
    {
        public TeamService() : base() { }
        public Team GetTeam(int teamId)
        {
            var sql = @"SELECT * FROM fan.Teams a
                        WHERE a.TeamId = @teamId";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var res = connection.Query<Team>(sql, new { teamId }).ToList().First();
                return res;
            }
        }
        public List<Team> GetTeamsMatchingName(string teamName)
        {
            var sql = @"SELECT * FROM fan.Teams a
                        LEFT JOIN fan.Nations b ON a.Country = b.NationId
                        WHERE UPPER(a.teamName) like '%' + UPPER(@teamName) + '%'";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var res = connection.Query<Team>(sql, new { teamName }).ToList();
                return res;
            }
        }
        public int InsertTeam(string a, string b, string c)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {
                    var affectedRows = connection.Execute("Insert into fan.Teams (TeamId, TeamName, Country) " +
                                "values (@Id, @Name, @Nation)", new { Id = a, Name = b, Nation = c });
                    return affectedRows;
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
        }

        public int UpdateTeam(string a, string b, string c)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {
                    var affectedRows = connection.Execute("Update fan.Teams Set TeamName = @Name, Country = @Nation " +
                                "where TeamId = @Id", new { Id = a, Name = b, Nation = c });
                    return affectedRows;
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
        }

        public int UpdateLeague(int teamId, string teamName, object league, int season)
        {
            try
            {

                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {
                    var teams = connection.Query<Team>("Select TeamId, TeamName from fan.Teams").AsList();

                    if (teamId == 0)
                    {
                        teamId = teams.Find(el => el.TeamName == teamName).TeamId;
                    }

                    var affectedRows = connection.Execute("Insert into fan.TeamsSeason (TeamId, TeamName, LeagueId, SeasonId) " +
            "values (@TeamId, @TeamName, @LeagueId, @SeasonId)", new { TeamId = teamId, TeamName = teamName, ((League)league).LeagueId, SeasonId = season });
                    return affectedRows;
                }
                
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
        }
        public int UpdateTeamLeague(int teamId, string teamName, object league, int season)
        {
            try
            {

                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {
             

                    var affectedRows = connection.Execute("update fan.TeamsSeason set TeamName = @TeamName" +
                        " where TeamId = @TeamId and @LeagueId = LeagueId and SeasonId = @SeasonId ", 
                        new { TeamId = teamId, TeamName = teamName, ((League)league).LeagueId, SeasonId = season });
                    return affectedRows;
                }

            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
        }
        public int DeleteLeague(int teamId, string teamName, object league, int season)
        {
            try
            {

                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {
                    var teams = connection.Query<Team>("Select TeamId, TeamName from fan.Teams").AsList();

                    if (teamId == 0)
                    {
                        teamId = teams.Find(el => el.TeamName == teamName).TeamId;
                    }

                    var affectedRows = connection.Execute("delete from fan.TeamsSeason where " +
            "TeamId = @TeamId and LeagueId = @LeagueId and SeasonId = @SeasonId", new { TeamId = teamId, ((League)league).LeagueId, SeasonId = season });
                    return affectedRows;
                }

            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
        }

        public static List<Player> GetLineup(List<Player> players)
        {
            // divide by positions
            var goalies = players.Where(el => el.Position.Equals("G")).OrderByDescending(e => e.Games).ToList();
            List<Player> skaters = players.Where(el => !el.Position.Equals("G"))
                .OrderByDescending(e => (float)e.Points / e.Games).ToList();

            // determine positional compatibility
            skaters.ForEach(el => el.DeterminePositionalCompatibility());

            int linesCount = skaters.Count / 5 > 4 ? 4 : skaters.Count / 5;

            // fill output list
            List<Player> ps = new List<Player>();
            if (goalies.Count > 0)
            {
                Player g = goalies.First();
                goalies.Remove(g);
                ps.Add(g);

                if (goalies.Count >= 1)
                {
                    g = goalies.First();
                    goalies.Remove(g);
                    ps.Add(g);
                }

                ps.Add(new Player());

                // generate only two lines
                for (int line = 0; line < linesCount; line++)
                {
                    Player ld = GetNextDefender(skaters);
                    skaters.Remove(ld);
                    ps.Add(ld);
                    Player rd = GetNextDefender(skaters);
                    skaters.Remove(rd);
                    ps.Add(rd);

                    // count occurances to determine the order of assignment
                    int lwCount = skaters.Where(el => el.positionalCompatibility.LW == true).ToList().Count;
                    int cCount = skaters.Where(el => el.positionalCompatibility.C == true).ToList().Count;
                    int rwCount = skaters.Where(el => el.positionalCompatibility.RW == true).ToList().Count;

                    if (rwCount < lwCount)
                    {
                        Player rw = GetNextRightWing(skaters);
                        Player c = GetNextCenter(skaters);
                        Player lw = GetNextLeftWing(skaters);

                        ps.Add(lw);
                        ps.Add(c);
                        ps.Add(rw);
                    }
                    else
                    {
                        Player lw = GetNextLeftWing(skaters);
                        Player c = GetNextCenter(skaters);
                        Player rw = GetNextRightWing(skaters);

                        ps.Add(lw);
                        ps.Add(c);
                        ps.Add(rw);
                    }

                    ps.Add(new Player());
                }
            }

            return ps;
        }

        public static Player GetNextDefender(List<Player> players)
        {
            Player d = new Player();

            try
            {
                d = players.First(el => el.positionalCompatibility.D == true);
            }
            catch (InvalidOperationException)
            {
                // when picking replacement for a defender, pick one with least points and most games
                d = players.Last();
            }
            players.Remove(d);

            return d;
        }

        public static Player GetNextCenter(List<Player> players)
        {
            Player c = new Player();

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

        public static Player GetNextLeftWing(List<Player> players)
        {
            Player p = new Player();

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

        public static Player GetNextRightWing(List<Player> players)
        {
            Player p = new Player();

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

        public List<Player> GetPlayers(object teamObj, string season)
        {
            var team = (teamObj as Team);
            if (team == null)
            {
                return new List<Player>();
            }
            var sql = @"SELECT a.PlayerId, b.Nr, a.FullName, a.Birthplace, a.Birthdate, a.Nation, a.Nation2, d.Flag, a.Position, b.Games, b.Goals, b.Assists, b.Goals + b.Assists Points, b.PlusMinus, b.PIM, b.GoalsAgainstAvg, b.SavesPercent, b.SeasonId, b.Nr, c.TeamId, c.TeamName 
                        FROM fan.Players a
                        INNER JOIN fan.PlayersTeams b on a.PlayerId = b.PlayerId
                        INNER JOIN fan.Teams c ON c.TeamId = b.TeamId
                        INNER JOIN fan.Nations d ON d.NationId = a.Nation
                        WHERE c.TeamId = @TeamId and b.SeasonId = @Season
                        ORDER BY b.Nr";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var res = connection.Query<Player, PlayerSeason, Team, Player>(
                    sql, (player, playerSeason, team) => { playerSeason.Player = player; playerSeason.Team = team; return player; }, new { TeamId = team.TeamId, Season = season }, splitOn: "PlayerId,SeasonId,TeamId").AsList();
                return res;
            }
        }

        public int UpdateTeamLogo(string path, object teamId, object teamName)
        {
            byte[] bytes = File.ReadAllBytes(path);
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                    var affectedRows = connection.Execute("update fan.Teams set TeamLogo = @Logo " +
            "where TeamId = @TeamId or TeamName = @TeamName", new { Logo = bytes, TeamId = teamId, TeamName = teamName});
                    return affectedRows;
            }
        }

        public TeamSeason GetTeamSeason(Team team, int season)
        {
            var sql = @"SELECT a.SeasonId, a.Comment, a.Done, b.TeamId, b.TeamName, c.LeagueId, c.LeagueName
                        FROM fan.Teams b 
                        LEFT JOIN fan.TeamsSeason a ON a.teamId = b.TeamId
                        LEFT JOIN fan.Leagues c ON c.leagueId = a.leagueId
                        WHERE a.TeamId = @teamId and seasonId = @season";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var res = connection.Query<TeamSeason, Team, League, TeamSeason>(
                    sql, (teamSeason, team, league) => { teamSeason.Team = team; teamSeason.League = league; return teamSeason; }, new { team.TeamId, season }, splitOn: "SeasonId,TeamId,LeagueId").AsList().FirstOrDefault();
                return res;
            }
        }

        public int UpdateComment(Team team, int season, string comment, bool done)
        {
            var sql = @"UPDATE fan.TeamsSeason SET comment = @comment, Done = @done
                        WHERE TeamId = @teamId AND SeasonId = @seasonId";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var affectedRows = connection.Execute(sql, new { teamId = team.TeamId, SeasonId = season, comment, done });
                return affectedRows;
            }
        }
    }
}
