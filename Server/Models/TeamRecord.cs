using Newtonsoft.Json.Linq;
using System;

namespace Server.Models
{
    public class TeamRecord : IEntity
    {
        public int TeamId;
        public int Wins;
        public int Losses;
        public int OT;
        private int _gamesPlayed;
        private int _goalsScored;
        private int _goalsAgainst;
        private int _points;

        public TeamRecord(int teamId)
        {
            TeamId = teamId;
            Wins = 0;
            Losses = 0;
            OT = 0;
        }

        public TeamRecord(int gamesPlayed, int goalsScored, int goalsAgainst, int points)
        {
            _gamesPlayed = gamesPlayed;
            _goalsScored = goalsScored;
            _goalsAgainst = goalsAgainst;
            _points = points;
        }

        public void ParseAnswer(string answer)
        {
            throw new NotImplementedException();
        }

        public void RegisterResult(int points)
        {
            if (points == 2)
            {
                Wins++;
            }
            else if (points == 1)
            {
                OT++;
            } else
            {
                Losses++;
            }
        }
    }
}
