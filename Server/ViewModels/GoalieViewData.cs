using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.ViewModels
{
    public class GoalieViewData
    {
        public string Name { get; set; }
        public string Position { get; set; }
        public int Games { get; set; }
        public int Wins { get; set; }
        public int Ot { get; set; }
        public int Shutouts { get; set; }
        public int Losses { get; set; }
        public int Saves { get; set; }
        public string Toi { get; set; }
        public float SavePerc { get; set; }
        public float GlsAgainstAverage { get; set; }
    }
}
