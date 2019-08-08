using Newtonsoft.Json.Linq;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Globalization;
using System.Text;

namespace SportPredictor.Models
{
    public class Player : IEntity
    {
        public int Id { get; }
        public bool Active { get; set; }
        public string Name { get; set; }
        public DateTime BirthDate { get; set; }
        public string BirthPlace { get; set; }
        public string Nationality { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public string Position { get; set; }
        public string ShotCatch { get; set; }
        public PlayerTeam Team { get; set; }
        public PlayerStats Stats { get; set; }

        /// <summary>
        /// Player constructor that gets player data from API
        /// </summary>
        /// <param name="id">Player ID</param>
        public Player(int id)
        {
            string answer = ApiHandler.SendRequest(RequestBuilder(id));
            ParseAnswer(answer);
            Id = id;
        }

        public Player(int id, string name, string position)
        {
            Id = id;
            Name = name;
            Position = position;
        }

        public Player(int id, string name, bool active, string position): this(id,name,position)
        {
            Active = active;
        }

        public void ParseAnswer(string answer)
        {
            var jsonObject = JObject.Parse(answer);
            var person = jsonObject["people"][0];
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


            var heightFormatting = person["height"].ToString().Substring(0,person["height"].ToString().Length - 1).Split('\'');
            Height = (int)Math.Ceiling(int.Parse(heightFormatting[0]) * 30.48 + int.Parse(heightFormatting[1]) * 2.54);
            Weight = (int)Math.Ceiling(int.Parse(person["weight"].ToString()) * 0.453592);
            if (person["nationality"] != null)
            {
                Nationality = person["nationality"].ToString();
            }
        }

        public static Player ParseOracle(DbDataReader row)
        {
            var player = new Player(Int32.Parse(row["id"].ToString()), row["name"].ToString(), row["position"].ToString())
            {
                Active = (!row["active"].Equals(DBNull.Value)) ? Int32.Parse(row["active"].ToString()) == 1 : false,
                BirthPlace = row["birthplace"].ToString(),
                ShotCatch = row["shotcatch"].ToString(),
                Nationality = row["nation"].ToString()
            };
            try
            {
                player.Height = Int32.Parse(row["height"].ToString());
                player.Weight = Int32.Parse(row["weight"].ToString());
                player.BirthDate = DateTime.ParseExact(row["birthdate"].ToString(), "d.M.yyyy. h:mm:ss", CultureInfo.InvariantCulture);
            } catch (FormatException)
            {
                ;
            }
            return player;
        }

        public static Player ExtendedParseOracle(DbDataReader row)
        {
            var basicPlayer = ParseOracle(row);
            basicPlayer.Team = PlayerTeam.ParseOracle(row);
            basicPlayer.Stats = PlayerStats.ParseOracle(row);
            return basicPlayer;
        }

        public static string RequestBuilder(long id)
        {
            return string.Format("https://statsapi.web.nhl.com/api/v1/people/{0}", id);
        }
    }
}
