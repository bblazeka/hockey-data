using System;
using System.Collections.Generic;
using System.Text;

namespace DbServices.Models
{
    public class TeamSeason
    {
        public int SeasonId { get; set; }
        public Team Team { get; set; }
        public League League { get; set; }
    }
}
