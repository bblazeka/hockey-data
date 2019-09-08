using AutoMapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Predictor.Controllers;
using Server;
using Server.Handlers;
using Server.Models;

namespace Test
{
    [TestClass]
    public class GeneralTest : Test
    {
        private LeagueController m_leagueController;

        public GeneralTest()
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mappingConfig.CreateMapper();
            m_leagueController = new LeagueController(mapper);
        }

        [TestMethod]
        public void TestSchedule()
        {
            var schedule = m_leagueController.GetSchedule("2019-10-05","2019-10-20");
        }

        [TestMethod]
        public void TestStandings()
        {
            var standings = m_leagueController.GetStandings();
        }
    }
}
