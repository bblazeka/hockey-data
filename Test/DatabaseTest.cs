using Microsoft.VisualStudio.TestTools.UnitTesting;
using SportPredictor.Handlers;
using SportPredictor.Models;
using SportPredictor.Databases;

namespace Test
{
    [TestClass]
    public class DatabaseTest : Test
    {
        /*

        [TestMethod]
        public void DatabasePlayerTest()
        {
            DatabaseHandler handler = new DatabaseHandler();
            handler.UpdatePlayerTeamNumbers();
        }*/

        [TestMethod]
        public void DatabaseStatsTest()
        {
            PostgreSQLDatabase database = new PostgreSQLDatabase();
            DatabaseHandler handler = new DatabaseHandler(database);
            handler.PopulatePlayers();
        }
    }
}
