using Newtonsoft.Json.Linq;
using SportPredictor.Databases;
using SportPredictor.Mediators;
using SportPredictor.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SportPredictor.Handlers
{
    public class GameHandler : Handler
    {
        public GameHandler(IDatabase database) : base(database)
        {
        }

        public List<Game> GetGames(DateTime start, DateTime end)
        {
            var jsonObject = JObject.Parse(ApiMediator.SendRequest(Game.RequestBuilder(start,end)));
            var games = new List<Game>();
            foreach (var date in jsonObject["dates"])
            {
                var exactDate = date["date"];
                foreach (var game in date["games"])
                {
                    var homeId = int.Parse(game["teams"]["home"]["team"]["id"].ToString());
                    var awayId = int.Parse(game["teams"]["away"]["team"]["id"].ToString());
                    games.Add(new Game(homeId,awayId));
                }
            }
            return games;
        }
    }
}
