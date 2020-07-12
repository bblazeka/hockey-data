using HockeyDb.Services;
using HockeyDb.ViewModels;
using HockeyDb.Views;
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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace HockeyDb
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private DatabaseService m_dbService;
        public MainWindow()
        {
            InitializeComponent();
            m_dbService = new DatabaseService();
            TeamCb.ItemsSource = m_dbService.GetTeams();
            PlayerCb_Copy.ItemsSource = m_dbService.GetPlayers();
        }

        private void ShowMenuItem_Click(object sender, RoutedEventArgs e)
        {
            PlayerWindow w = new PlayerWindow();
            w.Show();
        }

        private void MenuItem_Click(object sender, RoutedEventArgs e)
        {
            TeamWindow w = new TeamWindow();
            w.Show();
        }

        private void LeagueMenuItem_Click(object sender, RoutedEventArgs e)
        {
            LeagueWindow w = new LeagueWindow();
            w.Show();
        }

        private void InsertPlayerTeamTb_Click(object sender, RoutedEventArgs e)
        {
            PlayerViewModel player = PlayerCb_Copy.SelectedItem as PlayerViewModel;
            StatusLbl.Content = "";
            var res = m_dbService.AddPlayerTeam(player.PlayerId, player.FullName,TeamCb.SelectedItem, Convert.ToInt32(SeasonCb.SelectedItem));
            Status(string.Format("{0} {1}",player.FullName, TeamCb.Text), res);
        }

        private void Status(string message, int res)
        {
            StatusLbl.Content = (res > 0) ? string.Format("{1}: {0} rows updated.", res, message) : string.Format("{0}: Update failed.", message);
        }

        private void RefreshBtn_Click(object sender, RoutedEventArgs e)
        {
            TeamCb.ItemsSource = m_dbService.GetTeams();
            PlayerCb_Copy.ItemsSource = m_dbService.GetPlayers();
        }

        private void DeleteBtn_Click(object sender, RoutedEventArgs e)
        {
            StatusLbl.Content = "";
            var res = m_dbService.DeletePlayerTeam(((PlayerViewModel)PlayerCb_Copy.SelectedItem).PlayerId,
                PlayerCb_Copy.Text, TeamCb.SelectedItem, Convert.ToInt32(SeasonCb.SelectedItem));
            Status(PlayerCb_Copy.Text, res);
        }

        private void SettingsMenuItem_Click(object sender, RoutedEventArgs e)
        {
            SettingsWindow w = new SettingsWindow();
            w.Show();
        }
    }
}
