using System;
using SportPredictor.Databases;

namespace SportPredictor
{
    class Program
    {

        static void Main(string[] args)
        {
            OracleDatabase ot = new OracleDatabase();
            ot.Connect();
            ot.Close();
        }
    }
}
