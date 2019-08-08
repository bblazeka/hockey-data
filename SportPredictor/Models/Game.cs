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
        public int HomeGoals { get; set; }
        public int AwayGoals { get; set; }
    }
}
