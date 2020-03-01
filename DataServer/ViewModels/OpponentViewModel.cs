using System;

namespace DataServer.ViewModels
{
    public class OpponentViewModel
    {
        public TeamViewModel Opponent { get; set; }
        public bool HomeGame { get; set; }
        public DateTime DatePlayed { get; set; }

        public OpponentViewModel() {
            
        }
    }
}