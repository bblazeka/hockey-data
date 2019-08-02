using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desktop.ViewModels
{
    public class Player
    {
        public bool Active { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string BirthPlace { get; set; }
        public string Nationality { get; set; }
        public int TeamJerseyNumber { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string Position { get; set; }
        public string ShotCatch { get; set; }
        public int StatsWins { get; set; }
        public int StatsGoals { get; set; }
        public int StatsAssists { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }
}
