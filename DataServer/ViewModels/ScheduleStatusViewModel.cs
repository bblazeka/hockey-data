using System.Collections.Generic;

namespace DataServer.ViewModels
{
    public class ScheduleStatusViewModel
    {
        public int HomeGames { get; set; }
        public int HigherPlacedOpponent { get; set; }
        public List<TeamViewModel> Opponents { get; set; }

        public ScheduleStatusViewModel() {
            Opponents = new List<TeamViewModel>();
        }
    }
}