using System;
using System.Collections.Generic;
using System.Text;

namespace HockeyDb.ViewModels
{
    public class TeamViewModel
    {
        public int TeamId { get; set; }
        public string TeamName { get; set; }
        public byte[] TeamLogo { get; set; }
        public string Country { get; set; }
        public byte[] Flag { get; set; }

        public override string ToString()
        {
            return TeamName;
        }
    }
}
