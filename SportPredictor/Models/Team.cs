using Newtonsoft.Json.Linq;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;

namespace SportPredictor.Models
{
    public class Team : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? FranchiseId { get; set; }
        public bool Active { get; set; }
        public byte[] Logo { get; set; }
        public TeamRecord Record { get; set; }
        public TeamDesign Design { get; set; }
        public List<Player> Players { get; set; }

        public Team(int id)
        {
            string answer = ApiHandler.SendRequest(RequestBuilder(id));
            ParseAnswer(answer);
        }

        public Team(int id, string name)
        {
            Id = id;
            Name = name;
        }

        public Team(int id, string name, int franchiseId)
        {
            Id = id;
            Name = name;
            FranchiseId = franchiseId;
        }

        public Team(int id, string name, TeamRecord record)
        {
            Id = id;
            Name = name;
            Record = record;
        }

        public void ParseAnswer(string answer)
        {
            var jsonObject = JObject.Parse(answer);
            var team = jsonObject["teams"][0];
            Name = team["name"].ToString();
            try
            {
                FranchiseId = Int32.Parse(team["franchiseId"].ToString());
            } catch
            {
                FranchiseId = null;
            }
            Active = Boolean.Parse(team["active"].ToString());
            if (Active)
            {
                List<Player> roster = new List<Player>();
                foreach (var rosterElement in team["roster"]["roster"])
                {
                    roster.Add(new Player(
                        int.Parse(rosterElement["person"]["id"].ToString()),
                        rosterElement["person"]["fullName"].ToString(),
                        rosterElement["position"]["code"].ToString()
                        )
                    );
                }
                Players = roster;
            }
        }

        public static Team ParseOracle(OracleDataReader row)
        {
            int id = Int32.Parse(row["id"].ToString());
            string name = row["name"].ToString();
            try
            {
                var team = new Team(id, name)
                {
                    Active = Int32.Parse(row["active"].ToString()) == 1,
                    FranchiseId = Int32.Parse(row["franchiseid"].ToString()),
                    Logo = (byte[])row["logo"]
                };
                return team;
            } catch (FormatException) {
                return new Team(id, name);
            } catch (InvalidCastException)
            {
                return new Team(id, name)
                {
                    Active = Int32.Parse(row["active"].ToString()) == 1,
                    FranchiseId = Int32.Parse(row["franchiseid"].ToString())
                };
            }
        }

        public static Team ExtendedParseOracle(OracleDataReader row)
        {
            var team = ParseOracle(row);
            team.Design = TeamDesign.ParseOracle(row);
            return team;
        }

        public static string RequestBuilder(int id)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/teams/{0}?expand=team.roster", id);
        }

        public static List<PlayerTeam> TeamPlayers(int id)
        {
            List<PlayerTeam> players = new List<PlayerTeam>();
            var jsonObject = JObject.Parse(ApiHandler.SendRequest(RequestBuilder(id)));
            foreach (var rosterElement in jsonObject["teams"][0]["roster"]["roster"])
            {
                if (rosterElement["jerseyNumber"] != null)
                {
                    players.Add(new PlayerTeam(
                        int.Parse(rosterElement["person"]["id"].ToString()),
                        int.Parse(jsonObject["teams"][0]["id"].ToString()),
                        int.Parse(rosterElement["jerseyNumber"].ToString())
                        )
                    );
                } else
                {
                    players.Add(new PlayerTeam(
                        int.Parse(rosterElement["person"]["id"].ToString()),
                        int.Parse(jsonObject["teams"][0]["id"].ToString())
                        )
                    );
                }

            }
            return players;
        }

        public override string ToString()
        {
            return Name;
        }
    }
}
