type TPlayer = {
  id: number;
  fullName: string;
  currentAge: number;
  jerseyNumber?: number;
  active: boolean;
  alternateCaptain: boolean;
  birthCity: string;
  birthDate: string;
  captain: boolean;
  currentTeam: TTeam;
  firstName: string;
  lastName: string;
  height: number;
  primaryNumber: number;
  primaryPosition: TPosition;
  rookie: boolean;
  rosterStatus: string;
  shootsCatches: string;
  weight: number;
  nationality: string;
  stats: TStats;
  description?: string;
  abbrName?: string;
  capHit?: string;
  averageStats?: TStats;
  nhlStats?: TStatsCollection;
  careerStats?: TStatsCollection;
};

type TStatsCollection = {
  totalGames: number;
  totalGoals: number;
  totalAssists: number;
  totalPoints: number;
  totalGamesStarted: number;
  totalWins: number;
  seasonSums: TSeasonSum[];
  stats: TSeasonStats[];
};

type TSeasonSum = {
  season: string;
  games: number;
  wins: number;
  goals: number;
  assists: number;
};

type TSeasonStats = {
  season: string;
  team: TTeam;
  league: TLeague;
  stat: TStats;
};

type TPosition = {
  code: string;
  name: string;
  type: string;
  abbreviation: string;
};

type TStats = {
  games: number;
  timeOnIce: string;
  // skater props
  goals: number;
  assists: number;
  ponumbers: number;
  pim: number;
  penaltyMinutes: number;
  plusMinus: number;
  shots: number;
  hits: number;
  blocked: number;
  faceOffPct: number;
  faceOffWins: number;
  faceoffTaken: number;
  evenTimeOnIce: string;
  evenTimeOnIceMinutes: number;
  powerPlayTimeOnIce: string;
  powerPlayTimeOnIceMinutes: number;
  shotPct: number;
  overTimeGoals: number;
  gameWinningGoals: number;
  powerPlayGoals: number;
  powerPlayAssists: number;
  powerPlayPonumbers: number;
  shortHandedGoals: number;
  shortHandedAssists: number;
  shortHandedPonumbers: number;
  shortHandedTimeOnIce: string;
  shortHandedTimeOnIceMinutes: number;
  shifts: number;
  // goalie props
  gamesStarted: number;
  goalAgainstAverage: number;
  savePercentage: number;
  wins: number;
  losses: number;
  ot: number;
  saves: number;
  evenSaves: number;
  goalsAgainst: number;
  powerPlaySaves: number;
  shortHandedSaves: number;
  shotsAgainst: number;
  evenShots: number;
  powerPlayShots: number;
  shortHandedShots: number;
  shortHandedShotsAgainst: number;
  evenShotsAgainst: number;
  evenStrengthSavePercentage: number;
  powerPlaySavePercentage: number;
  shortHandedSavePercentage: number;
  shutouts: number;
  // (semi)common
  timeOnIcePerGame: string;
  evenTimeOnIcePerGame: string;
  shortHandedTimeOnIcePerGame: string;
  powerPlayTimeOnIcePerGame: string;
};
