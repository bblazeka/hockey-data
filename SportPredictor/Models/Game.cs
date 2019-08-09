using Newtonsoft.Json.Linq;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace SportPredictor.Models
{
    public class Game
    {
        public DateTime StartDate { get; set; }
        public Team Home { get; set; }
        public Team Away { get; set; }

        public Game(int homeId, int awayId)
        {
            Home = new Team(homeId);
            Away = new Team(awayId);
        }

        public static string RequestBuilder(DateTime firstDate, DateTime lastDate)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/schedule?startDate={0}&endDate={1}", firstDate.ToString("yyyy-MM-dd"), lastDate.ToString("yyyy-MM-dd"));
        }

        public static Game ParseOracle(DbDataReader row)
        {
            return new Game(int.Parse(row["homeid"].ToString()), int.Parse(row["awayid"].ToString()));
        }
    }
}
