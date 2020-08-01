using System;
using System.Collections.Generic;
using System.Text;

namespace DbServices.Models
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
