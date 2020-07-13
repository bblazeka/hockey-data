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

            frame.Content = new HomePage();

            Application.Current.MainWindow = this;
        }

        public void setLabel(string text)
        {
            this.lblStatus.Content = text;
        }

        private void btnPlayers_Click(object sender, RoutedEventArgs e)
        {
            frame.Content = new PlayerPage();
        }

        private void btnLeague_Click(object sender, RoutedEventArgs e)
        {
            frame.Content = new LeaguePage();
        }

        private void btnTeams_Click(object sender, RoutedEventArgs e)
        {
            frame.Content = new TeamPage();
        }

        private void btnHome_Click(object sender, RoutedEventArgs e)
        {
            frame.Content = new HomePage();
        }

        private void btnRefresh_Click(object sender, RoutedEventArgs e)
        {
            ((BasePage)frame.Content).Refresh();
        }
    }
}
