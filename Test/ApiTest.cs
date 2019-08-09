using Microsoft.VisualStudio.TestTools.UnitTesting;
using SportPredictor.Handlers;
using SportPredictor.Models;
using SportPredictor.Databases;

namespace Test
{
    [TestClass]
    public class ApiTest : Test
    {
        [TestMethod]
        public void TestFetchingTeamData()
        {
            var watch = System.Diagnostics.Stopwatch.StartNew();
            var team = new Team(10);
            watch.Stop();
            Assert.IsTrue(watch.ElapsedMilliseconds < TimeLimit);
        }

        [TestMethod]
        public void TestFetchingPlayerData()
        {
            var watch = System.Diagnostics.Stopwatch.StartNew();
            var player = new Player(8475883);
            watch.Stop();
            Assert.IsTrue(watch.ElapsedMilliseconds < TimeLimit);
        }

        [TestMethod]
        public void TestFetchingGames()
        {

        }
    }
}
