using Dapper;
using DbServices.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace DbServices.Services
{
    public class StaffService : DatabaseService
    {
        public StaffService() : base() { }

        public List<StaffSeason> GetStaffSeasons(object staffObj)
        {
            var staff = (staffObj as Staff);
            if (staff == null)
            {
                return new List<StaffSeason>();
            }
            var sql = @"SELECT a.StaffId, a.FullName, a.Position, b.SeasonId, b.StaffRole, c.TeamId, c.TeamName, c.TeamLogo, f.Flag, e.LeagueId, e.LeagueShort 
                        FROM fan.Staff a
                        INNER JOIN fan.StaffTeams b on a.StaffId = b.StaffId
                        INNER JOIN fan.Teams c ON c.TeamId = b.TeamId
                        INNER JOIN fan.TeamsSeason d ON c.TeamId = d.TeamId and b.SeasonId = d.SeasonId
                        INNER JOIN fan.Leagues e ON e.LeagueId = d.LeagueId
                        INNER JOIN fan.Nations f ON f.NationId = c.Country
                        WHERE a.StaffId = @StaffId
                        ORDER BY b.seasonId";
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var res = connection.Query<Staff, StaffSeason, Team, League, StaffSeason>(
                    sql, (staff, staffSeason, team, league) => { staffSeason.Staff = staff; staffSeason.Team = team; staffSeason.League = league; return staffSeason; }, new { StaffId = staff.StaffId }, splitOn: "StaffId,SeasonId,TeamId,LeagueId").AsList();
                return res;
            }
        }
        public int UpdateStaff(string nation, string position, int staffId, string nation2, string birthplace, DateTime birthdate)
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var affectedRows = connection.Execute("UPDATE fan.Staff SET Nation = @nation, position = @position, nation2 = @nation2, birthplace = @birthplace, birthdate = @birthdate " +
                "where staffId = @StaffId", new { nation, position, StaffId = staffId, nation2, birthplace, birthdate });
                return affectedRows;
            }
        }
        public int UpdateStaffSeason(int seasonId, int staffId, int teamId, string staffRole)
        {
            using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
            {
                var affectedRows = connection.Execute("UPDATE fan.StaffTeams SET StaffRole = @StaffRole " +
                "where StaffId = @StaffId and teamId = @TeamId and seasonId = @SeasonId", new { StaffRole = staffRole, StaffId = staffId, TeamId = teamId, SeasonId = seasonId });
                return affectedRows;
            }
        }
        public int InsertStaff(string id, string name, string pos, string nat)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {

                    var affectedRows = connection.Execute("Insert into fan.Staff (StaffId, FullName, Position, Nation) " +
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
        public int AddStaffTeam(int staffId, string FullName, object team, int season)
        {
            try
            {

                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {
                    var teams = connection.Query<Team>("Select TeamId, TeamName from fan.Teams").AsList();
                    var staff = connection.Query<Staff>("Select StaffId, FullName from fan.Staff").AsList();

                    if (staffId == 0)
                    {
                        staffId = staff.Find(el => el.FullName == FullName).StaffId;
                    }

                    var affectedRows = connection.Execute("Insert into fan.StaffTeams (StaffId, TeamId, SeasonId) " +
            "values (@StaffId, @TeamId, @SeasonId)", new { StaffId = staffId, ((Team)team).TeamId, SeasonId = season });
                    return affectedRows;
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
                return -1;
            }
        }

        public int DeleteStaffTeam(int staffId, string FullName, object team, int season)
        {
            try
            {

                using (SqlConnection connection = new SqlConnection(m_builder.ConnectionString))
                {
                    var teams = connection.Query<Team>("Select TeamId, TeamName from fan.Teams").AsList();
                    var staff = connection.Query<Staff>("Select StaffId, FullName from fan.Staff").AsList();

                    if (staffId == 0)
                    {
                        staffId = staff.Find(el => el.FullName == FullName).StaffId;
                    }

                    var affectedRows = connection.Execute("Delete from fan.StaffTeams " +
            "where StaffId = @StaffId and TeamId = @TeamId and SeasonId = @SeasonId", new { StaffId = staffId, ((Team)team).TeamId, SeasonId = season });
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
