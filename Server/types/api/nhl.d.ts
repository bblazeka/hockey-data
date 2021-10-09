type TApiGameBoxscore = {
  teams: TApiGameTeams;
  officials: [TApiOfficials];
};

type TApiGameTeams = {
  away: TApiGameTeam;
  home: TApiGameTeam;
};

type TApiGameTeam = {
  team: TApiTeam;
  teamStats: TApiGameTeamStats;
  players: TApiGamePlayers;
  goalies: [number];
  skaters: [number];
  onIce: any;
  onIcePlus: any;
  scratches: any;
  penaltyBox: any;
  coaches: any;
};

type TApiTeam = {
  id: number;
  name: string;
  link: string;
};

type TApiGameTeamStats = {
  teamSkaterStats: TApiGameTeamSkaterStats;
};

type TApiGameTeamSkaterStats = {
  goals: number;
  pim: number;
  shots: number;
  powerPlayPercentage: string;
  powerPlayGoals: number;
  powerPlayOpportunities: number;
  faceOffWinPercentage: string;
  blocked: number;
  takeaways: number;
  giveaways: number;
  hits: number;
};

type TApiGamePlayers = {
  [key: string]: TApiGamePlayer;
};

type TApiGamePlayer = {
  person: TApiGamePlayerPerson;
  jerseyNumber: string;
  position: TPosition;
  stats: {
    skaterStats: TStats;
    goalieStats: TStats;
  };
};

type TApiGamePlayerPerson = {
  id: number;
  fullName: string;
  link: string;
  firstName: string;
  lastName: string;
  primaryNumber: string;
  birthDate: string;
  currentAge: number;
  birthCity: string;
  birthStateProvince: string;
  birthCountry: string;
  nationality: string;
  height: string;
  weight: number;
  active: boolean;
  alternateCaptain: boolean;
  captain: boolean;
  rookie: boolean;
  shootsCatches: boolean;
  rosterStatus: boolean;
  currentTeam: {
    id: number;
    name: string;
    link: string;
  };
  primaryPosition: TPosition;
};

type TApiOfficials = {
  official: any;
  officialType: string;
};
