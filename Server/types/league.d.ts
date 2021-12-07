type TLeague = {
  id: number;
  name: string;
};

type TPeriod = {
  num: number;
  home: TTeamGameStats;
  away: TTeamGameStats;
};

type TLinescoreTeams = {
  home: TTeamGameStats;
  away: TTeamGameStats;
};

type TTeamGameStats = {
  goals: number;
  shotsOnGoal: number;
  rinkSide: string;
  team: TTeam;
};
