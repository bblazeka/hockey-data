using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class GameData
    {
        public DateTime StartDate { get; set; }
        public Team Home { get; set; }
        public float HomeWins { get; set; }
        public float HomeLosses { get; set; }
        public float HomeOT { get; set; }
        public Team Away { get; set; }
        public float AwayWins { get; set; }
        public float AwayLosses { get; set; }
        public float AwayOT { get; set; }
        public string Label { get; set; }

        public void ParseTeamRecords(TeamRecord homeRecord, TeamRecord awayRecord)
        {
            HomeWins = homeRecord.Wins;
            HomeLosses = homeRecord.Losses;
            HomeOT = homeRecord.OT;
            AwayWins = awayRecord.Wins;
            AwayLosses = awayRecord.Losses;
            AwayOT = awayRecord.OT;
        }
    }
}
