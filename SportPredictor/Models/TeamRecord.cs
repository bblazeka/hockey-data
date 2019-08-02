using Newtonsoft.Json.Linq;

namespace SportPredictor.Models
{
    public class TeamRecord : IEntity
    {
        private int _gamesPlayed;
        private int _goalsScored;
        private int _goalsAgainst;
        private int _points;

        public TeamRecord(int gamesPlayed, int goalsScored, int goalsAgainst, int points)
        {
            _gamesPlayed = gamesPlayed;
            _goalsScored = goalsScored;
            _goalsAgainst = goalsAgainst;
            _points = points;
        }

        public void ParseAnswer(string answer)
        {
            var jsonObject = JObject.Parse(answer);
        }
    }
}
