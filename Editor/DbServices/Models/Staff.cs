using System;
using System.Collections.Generic;
using System.Text;

namespace DbServices.Models
{
    public class Staff
    {
        public int StaffId { get; set; }
        public string FullName { get; set; }
        public string Position { get; set; }
        public string BirthPlace { get; set; }
        public DateTime Birthdate { get; set; }
        public string Nation { get; set; }
        public byte[] Flag { get; set; }
        public string Nation2 { get; set; }
        public byte[] Flag2 { get; set; }
        public List<StaffSeason> StaffSeasons { get; set; }

        public override string ToString()
        {
            return FullName;
        }
    }
}
