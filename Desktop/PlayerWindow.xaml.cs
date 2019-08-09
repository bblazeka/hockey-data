using AutoMapper;
using Desktop.Converters;
using Desktop.ViewModels;
using SportPredictor.Databases;
using SportPredictor.Handlers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Desktop
{
    /// <summary>
    /// Interaction logic for PlayerWindow.xaml
    /// </summary>
    public partial class PlayerWindow : Window
    {
        private Player _player;
        private PlayerHandler _dbHandler;
        private TeamHandler _teamHandler;
        private IMapper _mapper;

        public PlayerWindow(IMapper mapper, Player player, SportPredictor.Models.Team currentTeam)
        {
            _player = player;
            var database = new OracleDatabase();
            _teamHandler = new TeamHandler(database);
            _dbHandler = new PlayerHandler(database);
            InitializeComponent();
            searchButton.Click += searchButton_Click;
            _mapper = mapper;
            PopulateInterface(player,currentTeam);

        }

        private void searchButton_Click(object sender, RoutedEventArgs e)
        {
            var player = _dbHandler.GetPlayer(searchBox.Text);
            var team = _dbHandler.getPlayerTeam(player.Id);
            PopulateInterface(_mapper.Map<SportPredictor.Models.Player, Player>(player), team);
        }

        private void PopulateInterface(Player player, SportPredictor.Models.Team currentTeam)
        {
            playerData.Text = string.Empty;
            dataBlock.Text = string.Empty;
            var nation = _teamHandler.GetNation(player.Nationality);
            playerData.Inlines.Add("#" + player.TeamJerseyNumber + " ");
            playerData.Inlines.Add(player.Name + " (" + player.Position + ")");
            dataBlock.Inlines.Add("Place of Birth: " + player.BirthPlace + "\n");
            dataBlock.Inlines.Add("Date of Birth: " + player.BirthDate.ToString().Split()[0] + "\n");
            dataBlock.Inlines.Add("Nationality: " + nation.Name + "\n");
            flag.Source = ByteImageConverter.ByteToImage(nation.Flag);
            var teams = _teamHandler.GetTeams().OrderBy(team => team.Name);
            cmbTeams.ItemsSource = teams;
            cmbTeams.SelectedIndex = teams.Select((item, index) => new { Item = item, Index = index }).First(i => i.Item.Name == currentTeam.Name).Index;
        }
    }
}
