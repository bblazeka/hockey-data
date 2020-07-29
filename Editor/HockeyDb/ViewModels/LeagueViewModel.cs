using System;
using System.Collections.Generic;
using System.Text;

namespace HockeyDb.ViewModels
{
    public class LeagueViewModel
    {
        public int LeagueId { get; set; }
        public string LeagueName { get; set; }
        public override string ToString()
        {
            return LeagueName;
        }
    }
}
