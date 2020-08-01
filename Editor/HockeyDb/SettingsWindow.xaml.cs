using DbServices.Services;
using DbServices.Models;
using Microsoft.Win32;
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
using System.Windows.Shapes;

namespace HockeyDb
{
    /// <summary>
    /// Interaction logic for SettingsWindow.xaml
    /// </summary>
    public partial class SettingsWindow : Window
    {
        private DatabaseService m_dbService;
        public SettingsWindow()
        {
            InitializeComponent();
            m_dbService = new DatabaseService();
            Refresh();
        }

        public void Refresh()
        {
            var nations = m_dbService.GetNations();
            CbNat.ItemsSource = nations;
        }

        private void BtnUpdate_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            if (openFileDialog.ShowDialog() == true)
            {
                var res = m_dbService.UpdateNatFlag(openFileDialog.FileName, ((Nation)CbNat.SelectedItem).NationId);
                //RaiseStatusChange(string.Format("{0} image update", TeamNameTb.Text), res);
            }
        }
    }
}
