using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServer.ViewModels
{
    public class GameViewModel
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public TeamViewModel Home { get; set; }
        public TeamViewModel Away { get; set; }
        public int HomeGoals { get; set; }
        public int AwayGoals { get; set; }
    }
}
