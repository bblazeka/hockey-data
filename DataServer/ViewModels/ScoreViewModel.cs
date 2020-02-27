using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataServer.Models.Base;

namespace DataServer.ViewModels
{
    public class ScoreViewModel
    {
        public string Name { get; set; }
        public string ShortName { get; set; }
        public int Clock { get; set; }
        public string DisplayClock { get; set; }

        public ScoreViewModel() {}
    }
}