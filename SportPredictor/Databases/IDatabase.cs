using System;
using System.Collections.Generic;
using System.Data.Common;

namespace SportPredictor.Databases
{
    public interface IDatabase
    {
        void Connect();
        bool Execute(string query);
        object[] Execute(string query, Func<DbDataReader,object> parsingFunction);
        void Close();
    }
}
