using System;

namespace Server.ViewModels
{
    public class GameViewData
    {
        public DateTime StartDate { get; set; }
        public TeamViewData Home { get; set; }
        public TeamViewData Away { get; set; }
    }
}
