using System.Collections.Generic;

namespace DataServer.ViewModels
{
    public class ScheduleViewModel
    {
        public TeamViewModel Team { get; set; }
        public int HomeGames { get; set; }
        public int HigherPlacedOpponent { get; set; }
        public double ScheduleWeight { get; set; }
        public List<OpponentViewModel> Opponents { get; set; }

        public ScheduleViewModel() {
            Opponents = new List<OpponentViewModel>();
        }

        public void CalculateScheduleWeight() {
            // implement a method that takes positions and home/away into account
        }
    }
}