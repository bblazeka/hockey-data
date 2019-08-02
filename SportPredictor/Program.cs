using System;

namespace SportPredictor
{
    class Program
    {

        static void Main(string[] args)
        {
            OracleHandler ot = new OracleHandler();
            ot.Connect();
            ot.Close();
        }
    }
}
