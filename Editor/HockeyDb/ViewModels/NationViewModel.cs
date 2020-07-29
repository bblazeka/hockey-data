using System;
using System.Collections.Generic;
using System.Text;

namespace HockeyDb.ViewModels
{
    public class NationViewModel
    {
        public string NationId { get; set; }
        public string NationName { get; set; }
        public byte[] Flag { get; set; }
        public override string ToString()
        {
            return NationId;
        }
    }
}
