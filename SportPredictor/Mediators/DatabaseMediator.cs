using SportPredictor.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using SportPredictor.Databases;

namespace SportPredictor.Mediators
{
    public class DatabaseMediator
    {
        private IDatabase _handler;

        public DatabaseMediator(IDatabase database)
        {
            _handler = database;
            _handler.Connect();
        }

        ~DatabaseMediator()
        {
            _handler.Close();
        }
    }
}
