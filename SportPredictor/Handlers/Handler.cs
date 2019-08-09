using SportPredictor.Databases;
using System;
using System.Collections.Generic;
using System.Text;

namespace SportPredictor.Handlers
{
    public class Handler
    {
        protected IDatabase dbHandler;
        public Handler(IDatabase database)
        {
            dbHandler = database;
            dbHandler.Connect();
        }

        ~Handler()
        {
            dbHandler.Close();
        }
    }
}
