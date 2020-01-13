using DataServer.Mediators;
using DataServer.Models.Base;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServer.Models
{
    public class Team : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? FranchiseId { get; set; }
        public bool Active { get; set; }
        public string Logo { get; set; }
        public List<Player> Players { get; set; }
        public List<GameData> Games { get; set; }

        public Team()
        {
            Players = new List<Player>();
        }

        public Team(int id)
        {
            string answer = ApiMediator.SendRequest(RequestBuilder(id));
            ParseJsonAnswer(answer);
        }

        public Team(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public Team(int id, string name, int franchiseId) : this(id, name)
        {
            FranchiseId = franchiseId;
        }

        public void ParseJsonAnswer(string answer)
        {
            var jsonObject = JObject.Parse(answer);
            var team = jsonObject["teams"][0];
            Name = team["name"].ToString();
            try
            {
                FranchiseId = Int32.Parse(team["franchiseId"].ToString());
            }
            catch
            {
                FranchiseId = null;
            }
            Active = Boolean.Parse(team["active"].ToString());
            if (Active)
            {
                List<Player> roster = new List<Player>();
                foreach (var rosterElement in team["roster"]["roster"])
                {
                    var position = rosterElement["position"]["code"].ToString();
                    if (position == "G")
                    {
                        roster.Add(new Goalie(int.Parse(rosterElement["person"]["id"].ToString())));
                    }
                    else
                    {
                        roster.Add(new Skater(int.Parse(rosterElement["person"]["id"].ToString())));
                    }
                }
                Players = roster;
            }
        }

        public static string RequestBuilder(int id)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/teams/{0}?expand=team.roster", id);
        }

        public override string ToString()
        {
            return Name;
        }

    }
}
