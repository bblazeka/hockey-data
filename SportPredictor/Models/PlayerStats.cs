using Newtonsoft.Json.Linq;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Text;

namespace SportPredictor.Models
{
    public class PlayerStats : IEntity
    {
        public int PlayerId { get; set; }
        public string Season { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int PIM { get; set; }
        public int Shots { get; set; }
        public int PlusMinus { get; set; }
        public int Wins { get; set; }
        public int Games { get; set; }
        public int Saves { get; set; }
        public int GoalsAgainst { get; set; }

        public PlayerStats() { }

        public PlayerStats(int id, string season)
        {
            PlayerId = id;
            Season = season;
            string answer = ApiHandler.SendRequest(RequestBuilder(id, season));
            ParseAnswer(answer);
        }

        public PlayerStats(int id, string season, int goals, int assists) : this(id, season)
        {
            Goals = goals;
            Assists = assists;
        }

        public void ParseAnswer(string answer)
        {
            try
            {
                var jsonObject = JObject.Parse(answer);
                var yearlyStats = jsonObject["stats"][0]["splits"][0]["stat"];
                Goals = int.Parse(yearlyStats["goals"].ToString());
                Assists = int.Parse(yearlyStats["assists"].ToString());
                PIM = int.Parse(yearlyStats["pim"].ToString());
                Shots = int.Parse(yearlyStats["shots"].ToString());
                PlusMinus = int.Parse(yearlyStats["plusMinus"].ToString());
            } catch(ArgumentOutOfRangeException)
            {
                Console.WriteLine("no entry");
            } catch(NullReferenceException)
            {
                var jsonObject = JObject.Parse(answer);
                var yearlyStats = jsonObject["stats"][0]["splits"][0]["stat"];
                Games = int.Parse(yearlyStats["games"].ToString());
                Wins = int.Parse(yearlyStats["wins"].ToString());
                Saves = int.Parse(yearlyStats["saves"].ToString());
                GoalsAgainst = int.Parse(yearlyStats["goalsAgainst"].ToString());
            }
        }

        public static PlayerStats ParseOracle(OracleDataReader row)
        {
            try
            {
                int playerId = Int32.Parse(row["playerid"].ToString());
                string season = row["season"].ToString();
                try
                {
                    return new PlayerStats(playerId, season)
                    {
                        Goals = Int32.Parse(row["goals"].ToString()),
                        Assists = Int32.Parse(row["assists"].ToString()),
                        PIM = Int32.Parse(row["pim"].ToString()),
                        Shots = Int32.Parse(row["shots"].ToString())
                    };
                }
                catch (ArgumentOutOfRangeException)
                {
                    return new PlayerStats(playerId, season);
                }
            }
            catch (IndexOutOfRangeException)
            {
                return new PlayerStats();
            }

        }

        public static string RequestBuilder(long id, string season)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/people/{0}/stats?stats=statsSingleSeason&season={1}", id, season);
        }
    }
}
