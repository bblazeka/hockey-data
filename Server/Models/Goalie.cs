using Newtonsoft.Json.Linq;
using Server.Mediators;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Globalization;
using System.Text;

namespace Server.Models
{
    public class Goalie : Player
    {
        public int Games { get; set; }
        public int Wins { get; set; }
        public int Ot { get; set; }
        public int Shutouts { get; set; }
        public int Losses { get; set; }
        public int Saves { get; set; }
        public string Toi { get; set; }
        public float SavePerc { get; set; }
        public float GlsAgainstAverage { get; set; }

        public Goalie(int id) : base(id) {
            string answer = ApiMediator.SendRequest(RequestBuilder(id, "20192020"));
            ParseAnswer(answer);
        }

        public new void ParseAnswer(string answer) {
            var jsonObject = JObject.Parse(answer);
            try {
                var stats = jsonObject["stats"][0]["splits"][0]["stat"];
                Games = int.Parse(stats["games"].ToString());
                Wins = int.Parse(stats["wins"].ToString());
                Ot = int.Parse(stats["ot"].ToString());
                Shutouts = int.Parse(stats["shutouts"].ToString());
                Losses = int.Parse(stats["losses"].ToString());
                Saves = int.Parse(stats["saves"].ToString());
                Toi = stats["timeOnIce"].ToString();
                SavePerc = float.Parse(stats["savePercentage"].ToString());
                GlsAgainstAverage = float.Parse(stats["goalAgainstAverage"].ToString());
            } catch(Exception) {
                Games = 0;
                Wins = 0;
            }
        }


        public static string RequestBuilder(long id, string season)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/people/{0}/stats?stats=statsSingleSeason&season={1}", id, season);
        }
    }
}