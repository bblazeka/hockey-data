using System;
using System.Collections.Generic;
using System.Text;

namespace DbServices.Models
{
    public class Player
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
        public byte[] Flag2 { get; set; }
        public bool Active { get; set; }
        public string Comment { get; set; }
        public PositionalCompatibility positionalCompatibility { get; set; }
        public List<PlayerSeason> PlayerSeasons { get; set; }

        public override string ToString()
        {
            return FullName;
        }

        public void DeterminePositionalCompatibility()
        {
            positionalCompatibility = new PositionalCompatibility();
            positionalCompatibility.G = Position.Contains("G");
            positionalCompatibility.D = Position.Contains("D");
            positionalCompatibility.LW = Position.Contains("LW") || Position.Equals("F");
            positionalCompatibility.C = Position.Contains("C") || Position.Equals("F");
            positionalCompatibility.RW = Position.Contains("RW") || Position.Equals("F");
        }
    }

    public class PositionalCompatibility
    {
        public bool G = false;
        public bool D = false;
        public bool LW = false;
        public bool C = false;
        public bool RW = false;
    }
}
