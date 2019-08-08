using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace SportPredictor.Models
{
    public class Nation
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public byte[] Flag { get; set; }

        public Nation(string code, string name)
        {
            Code = code;
            Name = name;
        }

        public Nation(string code, string name, byte[] flag) : this(code,name)
        {
            Flag = flag;
        }

        public static Nation ParseOracle(DbDataReader row)
        {
            return new Nation(row["nationid"].ToString(), row["name"].ToString(), (byte[])row["flag"]);
        }
    }
}
