using Newtonsoft.Json.Linq;
using Oracle.ManagedDataAccess.Client;
using SportPredictor.Mediators;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace SportPredictor.Models
{
    public class PlayerTeam : IEntity
    {
        public int PlayerId { get; set; }
        public int TeamId { get; set; }
        public int JerseyNumber { get; set; }

        public PlayerTeam(int playerId)
        {
            string answer = ApiMediator.SendRequest(RequestBuilder(playerId));
            ParseAnswer(answer);
        }

        public PlayerTeam(int playerId, int teamId)
        {
            PlayerId = playerId;
            TeamId = teamId;
        }

        public PlayerTeam(int playerId, int teamId, int jersey) : this(playerId, teamId)
        {
            JerseyNumber = jersey;
        }

        public static PlayerTeam ParseOracle(DbDataReader row)
        {
            int playerId = Int32.Parse(row["playerid"].ToString());
            int teamId = Int32.Parse(row["teamid"].ToString());
            return new PlayerTeam(playerId, teamId, Int32.Parse(row["jerseynum"].ToString()));
        }

        public void ParseAnswer(string answer)
        {
            var jsonObject = JObject.Parse(answer);
            var person = jsonObject["people"][0];
            PlayerId = int.Parse(person["id"].ToString());
            if (person["currentTeam"] != null)
            {
                TeamId = int.Parse(person["currentTeam"]["id"].ToString());
            }
        }

        public static string RequestBuilder(int id)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/people/{0}", id);
        }
    }
}
