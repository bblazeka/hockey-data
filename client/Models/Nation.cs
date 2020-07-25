using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Models
{
    public class Nation
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
