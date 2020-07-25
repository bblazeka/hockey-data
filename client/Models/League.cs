using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Models
{
    public class League
    {
        public int LeagueId { get; set; }
        public string LeagueName { get; set; }
        public override string ToString()
        {
            return LeagueName;
        }
    }
}
