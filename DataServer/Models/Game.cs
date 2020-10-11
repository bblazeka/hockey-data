using AutoMapper;
using DataServer.Mediators;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataServer.Models
{
    public class Game
    {
        public string Id { get; set; }
        public Team Home { get; set; }
        public Team Away { get; set; }
        public int HomeGoals { get; set; }
        public int AwayGoals { get; set; }
        public DateTime DatePlayed { get; set; }

        public Game()
        {
            Home = new Team();
            Away = new Team();
        }

        public void ApiFetch(IMapper mapper, string id)
        {
            var jsonObject = JObject.Parse(ApiMediator.SendRequest(RequestBuilder(id)));
            try
            {
                var homeTeam = jsonObject["teams"]["home"];
                Home = new Team
                {
                    Id = int.Parse(homeTeam["team"]["id"].ToString()),
                    FullName = homeTeam["team"]["name"].ToString()
                };

                var homePlayers = homeTeam["players"];
                foreach (var homePlayer in homePlayers)
                {
                    var player = new Player();
                    player.ApiLoad(homePlayer.First()["person"]);
                    var stats = homePlayer.First()["stats"];
                    if (player.Position == "G")
                    {
                        var goalie = mapper.Map<Goalie>(player);
                        goalie.ApiLoad(stats["goalieStats"]);
                        Home.Players.Add(goalie);
                    }
                    else
                    {
                        var skater = mapper.Map<Skater>(player);
                        skater.ApiLoad(stats["skaterStats"]);
                        Home.Players.Add(skater);
                    }

                }

                var awayTeam = jsonObject["teams"]["away"];
                Away = new Team
                {
                    Id = int.Parse(awayTeam["team"]["id"].ToString()),
                    FullName = awayTeam["team"]["name"].ToString()
                };

                var awayPlayers = awayTeam["players"];
                foreach (var awayPlayer in awayPlayers)
                {
                    var player = new Player();
                    player.ApiLoad(awayPlayer.First()["person"]);
                    var stats = awayPlayer.First()["stats"];
                    if (player.Position == "G")
                    {
                        var goalie = mapper.Map<Goalie>(player);
                        goalie.ApiLoad(stats["goalieStats"]);
                        Away.Players.Add(goalie);
                    }
                    else
                    {
                        var skater = mapper.Map<Skater>(player);
                        skater.ApiLoad(stats["skaterStats"]);
                        Away.Players.Add(skater);
                    }

                }
            }
            catch (Exception)
            {
                Home = new Team();
                Away = new Team();
            }
        }

        public static string RequestBuilder(string id)
        {
            // https://statsapi.web.nhl.com/api/v1/game/2019020056/boxscore
            return string.Format("https://statsapi.web.nhl.com/api/v1/game/{0}/boxscore", id);
        }
    }
}
