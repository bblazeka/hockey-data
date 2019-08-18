using Microsoft.VisualStudio.TestTools.UnitTesting;
using SportPredictor;
using SportPredictor.Handlers;
using SportPredictor.Models;

namespace Test
{
    [TestClass]
    public class GeneralTest : Test
    {
        private LeagueHandler _leagueHandler;
        private TeamHandler _teamHandler;

        public GeneralTest()
        {
            _teamHandler = new TeamHandler();
            _leagueHandler = new LeagueHandler(_teamHandler);
        }

        [TestMethod]
        public void TestSchedule()
        {
            var teams = _leagueHandler.GetTeamsSchedule("2019-10-05","2019-10-20");
        }
    }
}
