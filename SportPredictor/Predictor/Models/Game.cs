using System;
using System.Collections.Generic;
using System.Text;

namespace Predictor.Models
{
    public class Game
    {
        public string HomeTeam { get; set; }
        public float HomeWins { get; set; }
        public float HomeLosses { get; set; }
        public float HomeOT { get; set; }
        public string AwayTeam { get; set; }
        public float AwayWins { get; set; }
        public float AwayLosses { get; set; }
        public float AwayOT { get; set; }
        public string Label { get; set; }
    }
}
