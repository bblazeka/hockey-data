using System;
using System.Collections.Generic;
using System.Text;

namespace HockeyDb.ViewModels
{
    public class PlayerViewModel
    {
        public int PlayerId { get; set; }
        public string FullName { get; set; }
        public string Position { get; set; }
        public string BirthPlace { get; set; }
        public DateTime Birthdate { get; set; }
        public string Nation { get; set; }
        public byte[] Flag { get; set; }
        public int Nr { get; set; }
        public int Games { get; set; }
        public int Goals { get; set; }
        public int Assists { get; set; }
        public int Points { get; set; }
        public int PIM { get; set; }
        public decimal GoalsAgainstAvg { get; set; }
        public decimal SavesPercent { get; set; }
        public string Nation2 { get; set; }
        public override string ToString()
        {
            return FullName;
        }
    }
}
