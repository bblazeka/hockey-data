using AutoMapper;
using DataServer;
using DataServer.Mediators;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Test
{
    public class DatabaseTest
    {
        private IMapper _mapper;
        private DbMediator _mediator;
        [SetUp]
        public void Setup()
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            _mapper = mappingConfig.CreateMapper();

            _mediator = new DbMediator();
        }
        [Test]
        public void TestDbTeamFetch()
        {
            var team = _mediator.GetTeamById(10);
            Assert.IsTrue(team.Name.Equals("Toronto Maple Leafs"));
        }

        [Test]
        public void TestDbPlayerFetchByName()
        {
            var players = _mediator.GetPlayersByName("Patrice Bergeron");
            Assert.IsTrue(players.Count > 0);
        }

        [Test]
        public void TestDbTeamFetchByName()
        {
            var players = _mediator.GetTeamsByName("Edmonton Oilers");
            Assert.IsTrue(players.Count > 0);
        }

        [Test]
        public void TestDbGetGames()
        {
            var rangeGames = _mediator.GetGames("2020-02-28", "2020-03-01");
            Assert.IsTrue(rangeGames.Count == 23);
        }
    }
}
