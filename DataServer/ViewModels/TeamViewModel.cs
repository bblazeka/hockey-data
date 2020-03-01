using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServer.ViewModels
{
    public class TeamViewModel
    {
        public int Id { get; private set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public int Wins { get; set; }
        public int Losses { get; set; }
        public int Ot { get; set; }
        public int GoalsScored { get; set; }
        public int GoalsAgainst { get; set; }
        public int Points { get; set; }
        public int DivisionRank { get; set; }
        public int ConferenceRank { get; set; }
        public int LeagueRank { get; set; }
        public int GamesPlayed { get; set; }
        public string Division { get; set; }
        public string Conference { get; set; }
        public ScheduleViewModel Schedule { get; set; }
        public List<GameViewModel> Games { get; set; }
        public List<GoalieViewModel> Goalies { get; set; }
        public List<SkaterViewModel> Skaters { get; set; }

        public TeamViewModel()
        {
            Schedule = new ScheduleViewModel();
        }

        public TeamViewModel(int id, string name) : base()
        {
            Id = id;
            Name = name;
            Logo = "";
        }
    }
}
