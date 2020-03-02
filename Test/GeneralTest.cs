using AutoMapper;
using DataServer;
using DataServer.Mediators;
using DataServer.Util;
using NUnit.Framework;

namespace Test
{
    public class GeneralTest
    {
        private IMapper _mapper;
        [SetUp]
        public void Setup()
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            _mapper = mappingConfig.CreateMapper();
        }

        [Test]
        public void TestArticleFetching()
        {
            var leagueHandler = new LeagueHandler(_mapper);
            var articles = leagueHandler.GetArticles();
            Assert.IsTrue(articles.Count > 0);
        }

        [Test]
        public void TestTeamsFetching()
        {
            var leagueHandler = new LeagueHandler(_mapper);
            Assert.IsTrue(leagueHandler.Teams.Count >= 31);
            Assert.IsTrue(leagueHandler.GetTeamNameById(1).Equals("New Jersey Devils"));
        }
    }
}