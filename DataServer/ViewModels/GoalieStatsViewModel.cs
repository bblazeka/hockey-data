namespace DataServer.ViewModels
{
    public class GoalieStatsViewModel
    {
        public string Season { get; set; }
        public int Games { get; set; }
        public int Wins { get; set; }
        public int Ot { get; set; }
        public int Shutouts { get; set; }
        public int Losses { get; set; }
        public int Saves { get; set; }
        public string Toi { get; set; }
        public float SavePerc { get; set; }
        public float GlsAgainstAverage { get; set; }
    }
}