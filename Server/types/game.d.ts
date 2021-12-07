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

type TGame = {
  gamePk: number;
  currentPeriod: number;
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: string;
  ongoingGame: boolean;
  finished: boolean;
  percentage: number;
  date: string;
  gameTime: string;
  powerPlayStrength: string;
  id: number;
  gameDate: Date;
  gameType: string;
  season: string;
  venue: TVenue;
  teams: TGameTeams;
  officials: [TGameOfficials];
  linescore: TLinescore;
  status: TGameStatus;
  home: TOpponent;
  away: TOpponent;
  opponent: TOpponent;
};

type TGameStatus = {
  abstractGameState: string;
  statusCode: string;
};

type TLinescore = {
  currentPeriodOrdinal: string;
  currentPeriodTimeRemaining: string;
  teams: TLinescoreTeams;
  periods: [TPeriod];
};

type TOpponent = {
  score: number;
  rating: number;
  team: TTeam;
  leagueRecord: TLeagueRecord;
};

type TGameTeams = {
  home: TGameTeam;
  away: TGameTeam;
};

type TGameTeam = {
  team: TTeam;
  skaters: [TGamePlayer];
  goalies: [TGamePlayer];
  coaches: [TCoach];
  goals: number;
  shotsOnGoal: number;
};

type TGameOfficials = {
  official: TOfficial;
  officialType: string;
};

type TOfficial = {
  id: number;
  fullName: string;
};

type TCoach = {
  person: TPerson;
  position: TStaffPosition;
};

type TPerson = {
  fullName: string;
};

type TStaffPosition = {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
};
