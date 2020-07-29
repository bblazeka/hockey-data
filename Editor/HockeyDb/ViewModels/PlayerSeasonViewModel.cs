using System;
using System.Collections.Generic;
using System.Text;

namespace HockeyDb.ViewModels
{
    public class PlayerSeasonViewModel
    {
        public int SeasonId { get; set; }
        public int Nr { get; set; }
        public int GP { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int Points { get; set; }
        public int PIM { get; set; }
        public int PlusMinus { get; set; }
        public decimal GoalsAgainstAvg { get; set; }
        public decimal SavesPercent { get; set; }
        public PlayerViewModel Player { get; set; }
        public TeamViewModel Team { get; set; }
        public LeagueViewModel League { get; set; }
    }
}
