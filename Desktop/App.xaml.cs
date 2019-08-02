using AutoMapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace Desktop
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private void Application_Startup(object sender, StartupEventArgs e)
        {
            var config = new MapperConfiguration(cfg => {
                cfg.CreateMap<SportPredictor.Models.Player, ViewModels.Player>();
                cfg.CreateMap<SportPredictor.Models.Team, ViewModels.Team>();
                cfg.CreateMap<SportPredictor.Models.PlayerStats, ViewModels.Stats>();
            }
            );
            // Create the startup window
            MainWindow wnd = new MainWindow(config);
            // Do stuff here, e.g. to the window
            wnd.Title = "NHL";
            // Show the window
            wnd.Show();
        }
    }
}
