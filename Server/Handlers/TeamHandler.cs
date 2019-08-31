using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Server.Mediators;
using Server.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Server.Handlers
{
    public class TeamHandler
    {
        private List<Team> _teams;

        public TeamHandler()
        {
            _teams = ParseAnswer(ApiMediator.SendRequest(RequestBuilder("2018", "2019"))).OrderBy(team => team.Name).ToList();
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
    }
}
