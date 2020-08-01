using System;
using System.Collections.Generic;
using System.Text;

namespace DbServices.Models
{
    public class League
    {
        public int LeagueId { get; set; }
        public string LeagueShort { get; set; }
        public string LeagueName { get; set; }
        public override string ToString()
        {
            return LeagueName;
        }
    }
}
