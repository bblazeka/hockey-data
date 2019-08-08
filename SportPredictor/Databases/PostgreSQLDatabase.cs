using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Diagnostics;
using Npgsql;
using Oracle.ManagedDataAccess.Client;

namespace SportPredictor.Databases
{
    public class PostgreSQLDatabase : IDatabase
    {
        private NpgsqlConnection _conn;
        public void Connect()
        {
            _conn = new NpgsqlConnection("Server=127.0.0.1;Port=5432;User Id=postgres;Password=postgres;Database=postgres;");
            _conn.Open();
        }

        public bool Execute(string query)
        {
            try
            {
                // Retrieve all rows
                using (var cmd = new NpgsqlCommand(query, _conn))
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Console.WriteLine(reader.GetString(0));
                    }
                    return reader.Read();
                }

            }
            catch (PostgresException ex)
            {
                Debug.WriteLine(ex.ToString());
                return false;
            }
        }

        public object[] Execute(string query, Func<DbDataReader, object> parsingFunction)
        {
            using (var cmd = new NpgsqlCommand(query, _conn))
            using (var reader = cmd.ExecuteReader())
            {
                List<object> output = new List<object>();
                while (reader.Read())
                {
                    output.Add(parsingFunction(reader));
                }
                return output.ToArray();
            }
        }

        public void Close()
        {
            _conn.Close();
            _conn.Dispose();
        }
    }
}
