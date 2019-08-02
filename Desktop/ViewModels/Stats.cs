using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desktop.ViewModels
{
    public class Stats
    {
        public string Season { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int PIM { get; set; }
        public int Shots { get; set; }
        public int PlusMinus { get; set; }
    }
}
