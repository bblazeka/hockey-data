using AutoMapper;
using Desktop.Converters;
using SportPredictor.Databases;
using SportPredictor.Handlers;
using SportPredictor.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Desktop
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private TeamHandler _dbHandler;
        private PlayerHandler _playerHandler;
        private IMapper _mapper;
        private Team _team;
        public MainWindow(MapperConfiguration config)
        {
            InitializeComponent();
            var database = new OracleDatabase();
            _dbHandler = new TeamHandler(database);
            _playerHandler = new PlayerHandler(database);
            _mapper = config.CreateMapper();
            cmbteams.ItemsSource = _dbHandler.GetTeams().OrderBy(team => team.Name);
            rosterRefresh.Click += rosterRefresh_Click;
            rosterRefresh.Visibility = Visibility.Hidden;
        }

        private void cmbteams_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            rosterRefresh.Visibility = Visibility.Visible;
            var selectedTeam = (Team)(cmbteams.SelectedItem);
            _team = _dbHandler.GetTeam(selectedTeam.Id);
            logoimage.Source = ByteImageConverter.ByteToImage(selectedTeam.Logo);
            teamlabel.Content = selectedTeam.Name;
            var players = _team.Players.Select(player => _mapper.Map<Player, ViewModels.Player>(player)).ToList();
            var viewTeam = _mapper.Map<Team, ViewModels.Team>(_team);
            goalies.Children.Clear();
            defenders.Children.Clear();
            leftwings.Children.Clear();
            centers.Children.Clear();
            rightwings.Children.Clear();
            foreach (var goalie in players.Where(player => player.Position == "G").ToList())
            {
                goalies.Children.Add(createButton(goalie, viewTeam));
            }
            foreach (var defender in players.Where(player => player.Position == "D").ToList())
            {
                defenders.Children.Add(createButton(defender, viewTeam));
            }
            foreach (var leftWing in players.Where(player => player.Position == "LW").ToList())
            {
                leftwings.Children.Add(createButton(leftWing, viewTeam));
            }
            foreach (var center in players.Where(player => player.Position == "C").ToList())
            {
                centers.Children.Add(createButton(center, viewTeam));
            }
            foreach (var rightWing in players.Where(player => player.Position == "RW").ToList())
            {
                rightwings.Children.Add(createButton(rightWing, viewTeam));
            }
        }

        private void rosterRefresh_Click(object sender, RoutedEventArgs e)
        {
            _team.Players.Select(player => player.Stats = _playerHandler.GetPlayerStats(player.Id, "20182019")).ToList();
            var players = _team.Players.Select(player => _mapper.Map<Player, ViewModels.Player>(player)).ToList();
            var viewTeam = _mapper.Map<Team, ViewModels.Team>(_team);
            goalies.Children.Clear();
            defenders.Children.Clear();
            leftwings.Children.Clear();
            centers.Children.Clear();
            rightwings.Children.Clear();
            foreach (var goalie in players.Where(player => player.Position == "G").OrderByDescending(player => player.StatsWins).ToList())
            {
                goalies.Children.Add(createButton(goalie, viewTeam));
            }
            foreach (var defender in players.Where(player => player.Position == "D").OrderByDescending(player => player.StatsGoals + player.StatsAssists).ToList())
            {
                defenders.Children.Add(createButton(defender, viewTeam));
            }
            foreach (var leftWing in players.Where(player => player.Position == "LW").OrderByDescending(player => player.StatsGoals + player.StatsAssists).ToList())
            {
                leftwings.Children.Add(createButton(leftWing, viewTeam));
            }
            foreach (var center in players.Where(player => player.Position == "C").OrderByDescending(player => player.StatsGoals + player.StatsAssists).ToList())
            {
                centers.Children.Add(createButton(center, viewTeam));
            }
            foreach (var rightWing in players.Where(player => player.Position == "RW").OrderByDescending(player => player.StatsGoals + player.StatsAssists).ToList())
            {
                rightwings.Children.Add(createButton(rightWing, viewTeam));
            }
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            PlayerWindow playerWindow = new PlayerWindow(_mapper,(ViewModels.Player)((Button)sender).Tag, _team);
            playerWindow.Show();
        }

        private void exit_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }

        private Button createButton(ViewModels.Player player, ViewModels.Team viewTeam)
        {
            Button button = new Button
            {
                Content = player.ToString(),
                Tag = player,
                Foreground = (SolidColorBrush)new BrushConverter().ConvertFromString(viewTeam.DesignTextColor),
                Background = (SolidColorBrush)new BrushConverter().ConvertFromString(viewTeam.DesignPrimaryColor),
                BorderBrush = (SolidColorBrush)new BrushConverter().ConvertFromString(viewTeam.DesignSecondaryColor)
            };
            button.Click += Button_Click;
            return button;
        }
    }
}
