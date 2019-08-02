using SportPredictor.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;

namespace SportPredictor.Handlers
{
    public class DatabaseHandler
    {
        private OracleHandler _handler;

        public DatabaseHandler()
        {
            _handler = new OracleHandler();
            _handler.Connect();
        }

        ~DatabaseHandler()
        {
            _handler.Close();
        }

        public PlayerStats GetPlayerStats(int playerId, string season)
        {
            var playerStats = _handler.Execute(String.Format("SELECT * FROM nhl_playerstats WHERE playerid = {0} AND season = {1}", playerId, season), PlayerStats.ParseOracle).First();
            return (PlayerStats)playerStats;
        }

        public Player GetPlayer(string name)
        {
            return (Player)_handler.Execute(String.Format("SELECT * FROM nhl_player p LEFT JOIN nhl_playerteam pt ON p.id = pt.playerid WHERE p.Name = '{0}'", name), Player.ExtendedParseOracle).First();
        }

        public List<Team> GetTeams()
        {
            var teams = _handler.Execute("SELECT * FROM nhl_team t", Team.ParseOracle);
            return teams.Select(team => (Team)team).Where(team => team.Active == true).ToList();
        }

        public Team getPlayerTeam(int playerId)
        {
            var team = (Team)_handler.Execute(String.Format("SELECT * FROM nhl_playerteam pt LEFT JOIN nhl_team t ON t.id = pt.teamid WHERE pt.playerid = {0}", playerId), Team.ParseOracle).FirstOrDefault();
            return team;
        }

        public Team GetTeam(int teamId, string name)
        {
            var players = _handler.Execute(String.Format("SELECT * FROM nhl_player p LEFT JOIN nhl_playerteam pt ON p.id = pt.playerid WHERE pt.teamid = {0}",teamId), Player.ExtendedParseOracle);
            var team = (Team)_handler.Execute(String.Format("SELECT * FROM nhl_team t LEFT JOIN nhl_teamdesign td ON t.id = td.teamid WHERE td.teamid = {0}", teamId), Team.ExtendedParseOracle).FirstOrDefault();
            team.Players = players.Select(player => (Player)player).ToList();
            return team;
        }

        public Nation GetNation(string code)
        {
            return (Nation)_handler.Execute(String.Format("SELECT * FROM nation WHERE nationid = '{0}'", code), Nation.ParseOracle).First();
        }

        public void PopulatePlayers()
        {
            int baseValue = 8465000;
            Enumerable.Range(0, 17000).ToList().ForEach(value =>
               {
                   try
                   {
                       var player = new Player(baseValue+value);
                       _handler.Execute(String.Format("INSERT INTO nhl_player (id,name,position,nation) values ({0},'{1}','{2}','{3}')", player.Id, player.Name, player.Position,player.Nationality));
                       System.Threading.Thread.Sleep(500);
                   }
                   catch (System.Net.WebException)
                   {
                       ;
                   }
                   catch (NullReferenceException)
                   {
                       ;
                   }
               });
        }

        public void UpdatePlayers()
        {
            var output = _handler.Execute("select * from nhl_player", Player.ParseOracle);
            foreach (Player player in output)
            {
                try
                {
                    Player api = new Player(player.Id);
                    _handler.Execute(String.Format("UPDATE nhl_player SET name = '{0}', position = '{1}', active = {2}, shotcatch = '{5}', height = {6}, weight = {3}, birthdate = TO_DATE('{7}','DD.MM.YYYY'), birthplace = '{8}' WHERE id = {4}",
                        api.Name, api.Position, api.Active ? 1 : 0, api.Weight, player.Id, api.ShotCatch, api.Height, api.BirthDate.ToString("dd.MM.yyyy"), api.BirthPlace));

                    if (api.Nationality != null)
                    {
                        _handler.Execute(String.Format("UPDATE nhl_player SET nation = '{0}' WHERE id = {1}",
                        api.Nationality, player.Id));
                    }
                    System.Threading.Thread.Sleep(500);
                }
                catch (System.Net.WebException)
                {
                    ;
                }
            }
        }

        public void PopulatePlayerStats()
        {
            var players = _handler.Execute("select * from nhl_player", Player.ParseOracle);
            var seasons = new string[] { "20182019", "20172018" };
            foreach (string season in seasons)
            {
                foreach (Player player in players)
                {
                    try
                    {
                        if(player.Position == "G")
                        {
                            Debug.WriteLine("Goalie");
                        }
                        var playerStats = new PlayerStats(player.Id, season);
                        Debug.WriteLine(player.Id+" "+player.Name);
                        _handler.Execute(String.Format("INSERT INTO nhl_playerstats (playerid,season,goals,assists,pim,shots) values ({0},'{1}',{2},{3},{4},{5})", player.Id, season, playerStats.Goals, playerStats.Assists, playerStats.PIM, playerStats.Shots));
                        System.Threading.Thread.Sleep(100);
                    }
                    catch (System.Net.WebException)
                    {
                        ;
                    }
                    catch (NullReferenceException)
                    {
                        ;
                    }
                }
            }
        }

        public void UpdatePlayerStats()
        {
            // TODO
        }

        public void PopulatePlayerTeams()
        {
            // first remove all entries
            _handler.Execute("DELETE FROM nhl_playerteam;");
            var teams = _handler.Execute("SELECT * FROM nhl_team WHERE active = 1", Team.ParseOracle);
            foreach (Team team in teams)
            {
                var teamPlayers = Team.TeamPlayers(team.Id);
                foreach (PlayerTeam player in teamPlayers)
                {
                    _handler.Execute(String.Format("INSERT INTO nhl_playerteam (teamid,playerid,jerseynum) VALUES ({2},{0},{1})", player.PlayerId, player.JerseyNumber, team.Id));
                }
            }
        }

        public void UpdatePlayerTeams()
        {
            var players = _handler.Execute("select * from nhl_player", Player.ParseOracle);
            foreach (Player player in players)
            {
                try
                {
                    var playerTeam = new PlayerTeam(player.Id);
                    Debug.WriteLine(player.Id);
                    _handler.Execute(String.Format("UPDATE nhl_playerteam SET teamid = {1} WHERE playerid = {0}", player.Id, playerTeam.TeamId));
                    System.Threading.Thread.Sleep(400);
                }
                catch (System.Net.WebException)
                {
                    ;
                }
                catch (NullReferenceException)
                {
                    ;
                }
            }
        }

        public void UpdatePlayerTeamNumbers()
        {
            var teams = _handler.Execute("SELECT * FROM nhl_team WHERE active = 1", Team.ParseOracle);
            foreach (Team team in teams)
            {
                var teamPlayers = Team.TeamPlayers(team.Id);
                foreach (PlayerTeam player in teamPlayers)
                {
                    _handler.Execute(String.Format("UPDATE nhl_playerteam SET jerseynum = {0} WHERE playerid = {1} AND teamid = {2}", player.JerseyNumber, player.PlayerId, team.Id));
                }
            }
        }

        public void UpdateTeams()
        {
            var output = _handler.Execute("SELECT * FROM nhl_team",Team.ParseOracle);
            foreach(Team team in output)
            {
                if(team.FranchiseId.HasValue)
                {
                    Team api = new Team(team.Id);
                    _handler.Execute(String.Format("UPDATE nhl_team SET name = '{0}', franchiseid = '{1}', active = {3} WHERE id = {2}",api.Name,api.FranchiseId,team.Id,api.Active ? 1 : 0));
                }
            }
        }
    }
}
