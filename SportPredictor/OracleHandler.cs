using Oracle.ManagedDataAccess.Client;
using Oracle.ManagedDataAccess.Types;
using System;
using System.Collections.Generic;
using System.Text;

namespace SportPredictor
{
    public class OracleHandler
    {
        OracleConnection con;
        public void Connect()
        {
            con = new OracleConnection
            {
                ConnectionString = "User Id=SYSTEM;Password=pass;Data Source=localhost:1521/xe;Pooling=false;"
            };
            con.Open();
            Console.WriteLine("Connected to Oracle" + con.ServerVersion);
        }

        public bool Execute(string query)
        {
            try
            {
                OracleCommand command = con.CreateCommand();
                command.CommandText = query;
                OracleDataReader reader = command.ExecuteReader();
                return reader.Read();
            } catch (Exception)
            {
                return false;
            }
        }

        public object[] Execute(string query, Func<OracleDataReader,object> parsingFunction)
        {
            OracleCommand command = con.CreateCommand();
            command.CommandText = query;
            OracleDataReader reader = command.ExecuteReader();
            List<object> output = new List<object>();
            while(reader.Read())
            {
                output.Add(parsingFunction(reader));
            }
            return output.ToArray();
        }

        public void Close()
        {
            con.Close();
            con.Dispose();
        }
    }
}
