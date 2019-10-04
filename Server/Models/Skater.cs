using Newtonsoft.Json.Linq;
using Server.Mediators;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Globalization;
using System.Text;

namespace Server.Models
{
    public class Skater : Player
    {
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int Pim { get; set; }
        public int Shots { get; set; }
        public int Games { get; set; }
        public int PlusMinus { get; set; }
        public int Points { get; set; }

        public Skater(int id) : base(id) {
            string answer = ApiMediator.SendRequest(RequestBuilder(id, "20192020"));
            ParseAnswer(answer);
        }

        public new void ParseAnswer(string answer) {
            var jsonObject = JObject.Parse(answer);
            try {
                var stats = jsonObject["stats"][0]["splits"][0]["stat"];
                Goals = int.Parse(stats["goals"].ToString());
                Assists = int.Parse(stats["assists"].ToString());
                Pim = int.Parse(stats["pim"].ToString());
                Shots =  int.Parse(stats["shots"].ToString());
                Games = int.Parse(stats["games"].ToString());
                PlusMinus = int.Parse(stats["plusMinus"].ToString());
                Points = int.Parse(stats["points"].ToString());
            } catch(Exception) {
                Pim = 0;
                Goals = 0;
                Assists = 0;
                Points = 0;
                Games = 0;
            }
        }

        public static string RequestBuilder(long id, string season)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/people/{0}/stats?stats=statsSingleSeason&season={1}", id, season);
        }
    }
}