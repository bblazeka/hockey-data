using DbServices.Services;
using DbServices.Models;
using System;
using System.Collections.Generic;
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
    /// Interaction logic for StaffPage.xaml
    /// </summary>
    public partial class StaffPage : BasePage
    {
        private StaffService m_dbService;
        public StaffPage()
        {
            InitializeComponent();
        }

        public StaffPage(StaffService service)
        {
            InitializeComponent();
            m_dbService = service;
            Refresh();
        }

        public override void Refresh()
        {
            var staff = m_dbService.GetStaffWithFlags();
            StaffCb.ItemsSource = staff.OrderBy(s => s.FullName);
            TeamCb.ItemsSource = m_dbService.GetTeams();
            StaffCb_Copy.ItemsSource = staff.OrderBy(s => s.FullName);
            StaffGrid.ItemsSource = staff.OrderBy(s => s.FullName);
            var nations = m_dbService.GetNations();
            NatCb.ItemsSource = nations;
            NatCb_Copy.ItemsSource = nations;
            Nat2Cb.ItemsSource = nations;
            NatFilterCb.ItemsSource = nations;
        }

        private void StaffCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            SeasonsDataGrid.ItemsSource = m_dbService.GetStaffSeasons(((ComboBox)sender).SelectedItem);
            var staff = (((ComboBox)sender).SelectedItem as Staff);

            PositionTb.Text = staff.Position;
            NatCb.Text = staff.Nation;
            Nat2Cb.Text = staff.Nation2;
            BirthplaceTb.Text = staff.BirthPlace;
            BirthdateDP.SelectedDate = staff.Birthdate;
        }

        private void UpdateBtn_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                foreach (StaffSeason entry in SeasonsDataGrid.Items)
                {
                    m_dbService.UpdateStaffSeason(entry.SeasonId, entry.Staff.StaffId, entry.Team.TeamId, entry.StaffRole);
                }
            }
            catch (InvalidCastException ex)
            {
                // caused by last element being an empty row
                Console.WriteLine(ex);
            }

            var res = m_dbService.UpdateStaff(NatCb.Text, PositionTb.Text, (StaffCb.SelectedItem as Staff).StaffId,
                Nat2Cb.Text, BirthplaceTb.Text, BirthdateDP.SelectedDate.GetValueOrDefault());
            RaiseStatusChange(string.Format("Update for {0}.",(StaffCb.SelectedItem as Staff).FullName), res);
        }

        private void StaffCb_Copy_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var staff = (Staff)((ComboBox)sender).SelectedItem;
            if (staff != null)
            {
                NameTb.Text = staff.FullName;
                IdTb.Text = staff.StaffId.ToString();
            }
        }

        private void ResetBtn_Click(object sender, RoutedEventArgs e)
        {
            IdTb.Text = "";
            NameTb.Text = "";
            PosTb.Text = "";
        }

        private void Insert_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.InsertStaff(IdTb.Text, NameTb.Text, PosTb.Text, NatCb_Copy.Text);
            RaiseStatusChange(string.Format("Insert {0} from {1}", NameTb.Text, NatCb_Copy.Text), res);
        }

        private void InsertStaffTeamTb_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.AddStaffTeam(IdTb.Text.Length == 0 ? 0 : Convert.ToInt32(IdTb.Text),
                NameTb.Text, TeamCb.SelectedItem, Convert.ToInt32(SeasonCb.SelectedItem));
            RaiseStatusChange(string.Format("Insert {0} - {1} {2}", NameTb.Text, TeamCb.SelectedItem, SeasonCb.SelectedItem), res);
        }

        private void DeleteBtn_Click(object sender, RoutedEventArgs e)
        {
            var res = m_dbService.DeleteStaffTeam(IdTb.Text.Length == 0 ? 0 : Convert.ToInt32(IdTb.Text),
                NameTb.Text, TeamCb.SelectedItem, Convert.ToInt32(SeasonCb.SelectedItem));
            RaiseStatusChange(string.Format("Delete {0} - {1} {2}", NameTb.Text, TeamCb.SelectedItem, SeasonCb.SelectedItem), res);
        }

        private void UpdateStaffBtn_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                foreach (Staff entry in StaffGrid.Items)
                {
                    m_dbService.UpdateStaff(entry.Nation, entry.Position, entry.StaffId, entry.Nation2, entry.BirthPlace, entry.Birthdate);
                }
            }
            catch (InvalidCastException ex)
            {
                // caused by last element being an empty row
                Console.WriteLine(ex);
            }
        }

        private void NatFilterCb_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (NatFilterCb.SelectedItem != null)
            {
                string selectedNation = (NatFilterCb.SelectedItem as Nation).NationId;
                StaffCb.ItemsSource = m_dbService.GetStaff().Where(p => p.Nation.Equals(selectedNation) ||
                (p.Nation2 != null && p.Nation2.Equals(selectedNation))).ToList();
            }
        }

        private void copySelectedBtn_Click(object sender, RoutedEventArgs e)
        {
            Staff staff = ((Staff)StaffGrid.SelectedItem);
            NameTb.Text = staff.FullName;
            IdTb.Text = staff.StaffId.ToString();
        }

        private void BtnNext_Click(object sender, RoutedEventArgs e)
        {
            StaffCb.SelectedIndex++;
        }
    }
}
