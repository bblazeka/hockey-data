type TGamePlayer = {
  person: TPlayer;
  jerseyNumber: string;
  position: TPosition;
  stats: TStats;
};

type TGameOpponent = {
  leagueRecord: TLeagueRecord;
  score: number;
  team: TTeam;
};

type TLeagueRecord = {
  wins: number;
  losses: number;
  ot: number;
  type: string;
};
