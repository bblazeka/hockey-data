using DbServices.Services;
using DbServices.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace HockeyDb.Views
{
    /// <summary>
    /// Interaction logic for HomePage.xaml
    /// </summary>
    public partial class HomePage : BasePage
    {
        private DatabaseService m_dbService;
        public HomePage()
        {
            InitializeComponent();
            m_dbService = new DatabaseService();
            Refresh();
        }

        public override void Refresh()
        {
            TeamCb.ItemsSource = m_dbService.GetTeams();
            PlayerCb_Copy.ItemsSource = m_dbService.GetPlayers();
        }

        private void InsertPlayerTeamTb_Click(object sender, RoutedEventArgs e)
        {
            Player player = PlayerCb_Copy.SelectedItem as Player;
            var res = m_dbService.AddPlayerTeam(player.PlayerId, player.FullName, TeamCb.SelectedItem, Convert.ToInt32(SeasonCb.SelectedItem));
            RaiseStatusChange(string.Format("INSERT {0} {1} {2}", player.FullName, TeamCb.Text, SeasonCb.SelectedItem), res);
        }

        private void DeleteBtn_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.DeletePlayerTeam(((Player)PlayerCb_Copy.SelectedItem).PlayerId,
                PlayerCb_Copy.Text, TeamCb.SelectedItem, Convert.ToInt32(SeasonCb.SelectedItem));
            RaiseStatusChange(string.Format("DELETE {0} {1} {2}", PlayerCb_Copy.SelectedItem, TeamCb.Text, SeasonCb.SelectedItem), res);
        }
    }
}
