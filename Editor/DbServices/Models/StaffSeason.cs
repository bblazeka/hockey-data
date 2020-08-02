using System;
using System.Collections.Generic;
using System.Text;

namespace DbServices.Models
{
    public class StaffSeason
    {
        public int SeasonId { get; set; }
        public Staff Staff { get; set; }
        public Team Team { get; set; }
        public League League { get; set; }
        public string StaffRole { get; set; }
    }
}
