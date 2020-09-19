using DbServices.Services;
using DbServices.Models;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
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
    /// Interaction logic for TeamPage.xaml
    /// </summary>
    public partial class TeamPage : BasePage
    {
        private TeamService m_dbService;
        public TeamPage()
        {
            InitializeComponent();
        }

        public TeamPage(TeamService ts)
        {
            InitializeComponent();
            m_dbService = ts;
            Refresh();
        }

        public override void Refresh()
        {
            TeamCb.ItemsSource = m_dbService.GetTeams();
            TeamsCb.ItemsSource = m_dbService.GetTeams();
            LeagueCb.ItemsSource = m_dbService.GetLeagues();
            TeamNationCb.ItemsSource = m_dbService.GetNations();
            var nations = m_dbService.GetNations();
            cbNation.ItemsSource = nations;
        }

        private void GenerateRoster(string selectedSeason)
        {
            if (TeamCb.SelectedItem != null)
            {
                List<Player> players = m_dbService.GetPlayers(TeamCb.SelectedItem, selectedSeason);

                RosterDataGrid.ItemsSource = players.FindAll(p => p.Position != "G");
                GoaliesDataGrid.ItemsSource = players.FindAll(p => p.Position == "G");

                lineupTextBlock.Text = "Projected lineup:\n";
                foreach (Player pvm in TeamService.GetLineup(players))
                {
                    if (pvm.FullName == null)
                    {
                        lineupTextBlock.Text += "\n";
                    }
                    else
                    {
                        lineupTextBlock.Text += string.Format("#{0} {1}\n", pvm.Nr.ToString(), pvm.FullName.ToString());
                    }
                }

                int foreignPlayers = players.Where(p => p.Nation != ((Team)TeamCb.SelectedItem).Country &&
                (p.Nation2 == null || p.Nation2 != ((Team)TeamCb.SelectedItem).Country)).ToList().Count;
                FgnLbl.Content = string.Format("Players: {0} Foreign: {1}", players.Count, foreignPlayers);
            }
        }

        private void InsertBtn_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.InsertTeam(TeamIdTb.Text, TeamNameTb.Text, TeamNationCb.Text);
            RaiseStatusChange(string.Format("{0} {1}", TeamNameTb.Text, TeamNationCb.Text), res);
        }

        private void UpdateLeagueBtn_Click(object sender, RoutedEventArgs e)
        {
            if (LeagueCb.SelectedItem == null)
            {
                RaiseStatusChange("League not selected", -1);
                return;
            }
            var res = m_dbService.UpdateLeague(Convert.ToInt32(TeamIdTb.Text), TeamNameTb.Text, LeagueCb.SelectedItem as League, Convert.ToInt32(SeasonCb.Text));
            RaiseStatusChange(string.Format("{0} {1} {2}", TeamNameTb.Text, LeagueCb.Text, SeasonCb.Text), res);
        }

        private void DeleteLeagueBtn_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.DeleteLeague(Convert.ToInt32(TeamIdTb.Text), TeamNameTb.Text, LeagueCb.SelectedItem as League, Convert.ToInt32(SeasonCb.Text));
            RaiseStatusChange(string.Format("{0} {1} {2}", TeamNameTb.Text, LeagueCb.Text, SeasonCb.Text), res);
        }

        private void TeamCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            Team selectedTeam = (Team)((ComboBox)sender).SelectedItem;
            if (selectedTeam == null)
            {
                return;
            }
            RosterDataGrid.ItemsSource = m_dbService.GetPlayers(selectedTeam, TeamSeasonCb.SelectedItem.ToString()).FindAll(p => p.Position != "G");
            GoaliesDataGrid.ItemsSource = m_dbService.GetPlayers(selectedTeam, TeamSeasonCb.SelectedItem.ToString()).FindAll(p => p.Position == "G");
            TeamLogoImg.Source = LoadImage((((ComboBox)sender).SelectedItem as Team).TeamLogo);


            TeamSeason teamSeason = m_dbService.GetTeamSeason(selectedTeam, Int32.Parse(TeamSeasonCb.SelectedItem.ToString()));

            if (teamSeason != null)
            {
                CommentCb.Text = teamSeason.Comment;
                cbOk.IsChecked = teamSeason.Done == true;

                GenerateRoster(TeamSeasonCb.SelectedItem.ToString());
            }
        }

        private void TeamSeasonCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (TeamCb.SelectedItem != null)
            {
                TeamSeason teamSeason = m_dbService.GetTeamSeason((Team)TeamCb.SelectedItem, Int32.Parse(TeamSeasonCb.SelectedItem.ToString()));
                if (teamSeason != null)
                {
                    CommentCb.Text = teamSeason.Comment;
                }
            }
            GenerateRoster(TeamSeasonCb.SelectedItem.ToString());
        }

        private void UpdateBtn_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            if (openFileDialog.ShowDialog() == true)
            {
                var res = m_dbService.UpdateTeamLogo(openFileDialog.FileName, TeamIdTb.Text, TeamNameTb.Text);
                RaiseStatusChange(string.Format("{0} image update", TeamNameTb.Text), res);
            }

        }

        private static BitmapImage LoadImage(byte[] imageData)
        {
            if (imageData == null || imageData.Length == 0) return null;
            var image = new BitmapImage();
            using (var mem = new MemoryStream(imageData))
            {
                mem.Position = 0;
                image.BeginInit();
                image.CreateOptions = BitmapCreateOptions.PreservePixelFormat;
                image.CacheOption = BitmapCacheOption.OnLoad;
                image.UriSource = null;
                image.StreamSource = mem;
                image.EndInit();
            }
            image.Freeze();
            return image;
        }

        private void TeamsCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var team = (((ComboBox)sender).SelectedItem as Team);
            if (team == null)
            {
                return;
            }
            TeamIdTb.Text = team.TeamId.ToString();
            TeamNameTb.Text = team.TeamName;
            TeamNationCb.Text = team.Country;
        }

        private void BtnSave_Click(object sender, RoutedEventArgs e)
        {
            var result = m_dbService.UpdateComment((Team)TeamCb.SelectedItem, int.Parse(TeamSeasonCb.SelectedItem.ToString()),
                CommentCb.Text, cbOk.IsChecked == true);
            RaiseStatusChange($"{((Team)TeamCb.SelectedItem).TeamName} - Status update", result);
        }

        private void cbNation_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (cbNation.SelectedItem != null)
            {
                string selectedNation = (cbNation.SelectedItem as Nation).NationId;
                TeamCb.ItemsSource = m_dbService.GetTeams().Where(p => p.Country.Equals(selectedNation)).ToList();
            }
        }
    }
}
