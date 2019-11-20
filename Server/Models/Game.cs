using AutoMapper;
using Newtonsoft.Json.Linq;
using Server.Mediators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Game
    {

        public Team Home { get; set; }
        public Team Away { get; set; }

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
                    Name = homeTeam["team"]["name"].ToString()
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
                    Name = awayTeam["team"]["name"].ToString()
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
            id = string.Format("20190200{0}", id);
            return string.Format("https://statsapi.web.nhl.com/api/v1/game/{0}/boxscore", id);
        }
    }
}
