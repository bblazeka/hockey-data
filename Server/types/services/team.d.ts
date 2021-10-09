type TTeam = {
  id: number;
  abbreviation: string;
  name: string;
  description: string;
  active: boolean;
  venue: TVenue;
  colorScheme: string;
  rosterResponse: [TPlayer];
  goalies: [TPlayer];
  defenders: [TPlayer];
  forwards: [TPlayer];
};

type TVenue = {
  id: number;
  name: string;
  city: string;
  description: string;
  timeZone: TimeZone;
};

type TimeZone = {
  id: string;
  offset: number;
  tz: string;
};
