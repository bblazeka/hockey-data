using Newtonsoft.Json.Linq;
using SportPredictor.Databases;
using SportPredictor.Mediators;
using SportPredictor.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SportPredictor.Handlers
{
    public class TeamHandler : Handler
    {
        private List<Team> _teams;

        public TeamHandler() : base(new OracleDatabase()) { }

        public TeamHandler(IDatabase database) : base(database)
        {
        }

        public List<Team> Teams
        {
            get { return _teams; }
            private set { _teams = value; }
        }

        public static string RequestBuilder(string start, string end)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/standings?season={0}{1}", start, end);
        }

        public static List<Team> ParseAnswer(string answer)
        {
            List<Team> teams = new List<Team>();
            var jsonObject = JObject.Parse(answer);
            foreach (var record in jsonObject["records"])
            {
                foreach (var teamRecord in record["teamRecords"])
                {
                    var teamRecordObject = new TeamRecord(Int32.Parse(teamRecord["gamesPlayed"].ToString()), Int32.Parse(teamRecord["goalsScored"].ToString()), Int32.Parse(teamRecord["goalsAgainst"].ToString()), Int32.Parse(teamRecord["points"].ToString()));
                    teams.Add(new Team(Int32.Parse(teamRecord["team"]["id"].ToString()), teamRecord["team"]["name"].ToString(), teamRecordObject));
                }
            }
            return teams;
        }

        public string getTeamNameById(int id)
        {
            return _teams.Find(x => x.Id == id).Name;
        }

        public List<Team> GetTeams()
        {
            var teams = dbHandler.Execute("SELECT * FROM nhl_team t", Team.ParseOracle).Cast<Team>();
            return teams.Where(team => team.Active == true).ToList();
        }

        public Team GetTeam(int teamId)
        {
            var players = dbHandler.Execute(String.Format("SELECT * FROM nhl_player p LEFT JOIN nhl_playerteam pt ON p.id = pt.playerid WHERE pt.teamid = {0}", teamId), Player.ExtendedParseOracle).Cast<Player>();
            var team = (Team)dbHandler.Execute(String.Format("SELECT * FROM nhl_team t LEFT JOIN nhl_teamdesign td ON t.id = td.teamid WHERE td.teamid = {0}", teamId), Team.ExtendedParseOracle).FirstOrDefault();
            team.Players = players.ToList();
            return team;
        }

        public Team GetTeam(string name)
        {
            var team = (Team)dbHandler.Execute(String.Format("SELECT * FROM nhl_team t LEFT JOIN nhl_teamdesign td ON t.id = td.teamid WHERE t.name = '{0}'", name), Team.ExtendedParseOracle).FirstOrDefault();
            var players = dbHandler.Execute(String.Format("SELECT * FROM nhl_player p LEFT JOIN nhl_playerteam pt ON p.id = pt.playerid WHERE pt.teamid = {0}", team.Id), Player.ExtendedParseOracle);
            team.Players = players.Select(player => (Player)player).ToList();
            return team;
        }

        public Nation GetNation(string code)
        {
            return (Nation)dbHandler.Execute(String.Format("SELECT * FROM nation WHERE nationid = '{0}'", code), Nation.ParseOracle).First();
        }



        public void UpdateTeams()
        {
            var output = dbHandler.Execute("SELECT * FROM nhl_team", Team.ParseOracle);
            foreach (Team team in output)
            {
                if (team.FranchiseId.HasValue)
                {
                    Team api = new Team(team.Id);
                    dbHandler.Execute(String.Format("UPDATE nhl_team SET name = '{0}', franchiseid = '{1}', active = {3} WHERE id = {2}", api.Name, api.FranchiseId, team.Id, api.Active ? 1 : 0));
                }
            }
        }
    }
}
