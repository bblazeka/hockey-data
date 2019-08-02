using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desktop.ViewModels
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Active { get; set; }
        public string DesignTextColor { get; set; }
        public string DesignPrimaryColor { get; set; }
        public string DesignSecondaryColor { get; set; }
        public List<Player> Players { get; set; }
    }
}
