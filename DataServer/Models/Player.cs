using DataServer.Mediators;
using DataServer.Models.Base;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataServer.Models
{
    public class Player : IEntity
    {
        public int Id { get; set; }
        public bool Active { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string BirthPlace { get; set; }
        public string Nationality { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string ShotCatch { get; set; }
        public string Position { get; set; }
        public Team Team { get; set; }
        public string Rostered { get; set; }
        public bool RosteredStatus
        {
            get { return Rostered == "T"; }
            set { Rostered = value ? "T" : "F"; }
        }
        public bool Rookie { get; set; }

        public Player() { }

        /// <summary>
        /// Player constructor that gets player data from API
        /// </summary>
        /// <param name="id">Player ID</param>
        public Player(int id)
        {
            if (id != 0)
            {
                string answer = ApiMediator.SendRequest(RequestBuilder(id));
                ParseJsonAnswer(answer);
                Id = id;
            }
        }

        public Player(int id, string name, Team team)
        {
            Id = id;
            Name = name;
            Team = team;
        }

        public Player(int id, string name, string position)
        {
            Id = id;
            Name = name;
            Position = position;
        }

        public Player(int id, string name, bool active, string position) : this(id, name, position)
        {
            Active = active;
        }

        public void ApiLoad()
        {
            ParseJsonAnswer(ApiMediator.SendRequest(RequestBuilder(Id)));
        }

        public void ApiLoad(JToken jsonObject)
        {
            var person = jsonObject;
            try
            {
                Console.WriteLine("Fetching... " + person["fullName"].ToString());
            }
            catch (NullReferenceException)
            {
                person = jsonObject["people"][0];
                Console.WriteLine("Fetching... " + person["fullName"].ToString());
            }
            Name = person["fullName"].ToString();
            Active = bool.Parse(person["active"].ToString());
            BirthDate = DateTime.ParseExact(person["birthDate"].ToString(), "yyyy-MM-dd", null);
            Position = person["primaryPosition"]["abbreviation"].ToString();
            if (person["shootsCatches"] != null)
            {
                ShotCatch = person["shootsCatches"].ToString();
            }
            StringBuilder birthPlace = new StringBuilder(person["birthCity"].ToString() + ", ");
            birthPlace.Append((person["birthStateProvince"] != null) ? person["birthStateProvince"].ToString() + ", " : "");
            birthPlace.Append(person["birthCountry"].ToString());
            BirthPlace = birthPlace.ToString();


            var heightFormatting = person["height"].ToString().Substring(0, person["height"].ToString().Length - 1).Split('\'');
            Height = (int)Math.Ceiling(int.Parse(heightFormatting[0]) * 30.48 + int.Parse(heightFormatting[1]) * 2.54);
            Weight = (int)Math.Ceiling(int.Parse(person["weight"].ToString()) * 0.453592);
            if (person["nationality"] != null)
            {
                Nationality = person["nationality"].ToString();
            }

            if (person["currentTeam"] != null)
            {
                Team = new Team(int.Parse(person["currentTeam"]["id"].ToString()), person["currentTeam"]["name"].ToString());
            }
        }

        public void ParseJsonAnswer(string answer)
        {
            var jsonObject = JObject.Parse(answer);

            ApiLoad(jsonObject);
        }

        public static string RequestBuilder(long id)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/people/{0}", id);
        }
    }
}
