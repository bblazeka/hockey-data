using System;

namespace Server.ViewModels
{
    public class GameViewData
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public TeamViewData Home { get; set; }
        public TeamViewData Away { get; set; }
        public int HomeGoals { get; set; }
        public int AwayGoals { get; set; }
    }
}
