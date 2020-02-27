using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataServer.Models.Base;

namespace DataServer.Models
{
    public class Article
    {
        public string Source { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public Team Team { get; set; }
        public List<Player> Players { get; set; }

        public Article() {}
    }
}
