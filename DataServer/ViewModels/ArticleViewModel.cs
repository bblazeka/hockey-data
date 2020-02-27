using System.Collections.Generic;

namespace DataServer.ViewModels
{
    public class ArticleViewModel
    {
        public string Source { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public TeamViewModel Team { get; set; }
        public List<PlayerViewModel> Players { get; set; }
    }
}