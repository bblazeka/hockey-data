import faker from "@faker-js/faker";

export const mockPlayers = (playersCount) => {
  return Array.from({length: playersCount}, () => ({
    id: faker.datatype.number(100),
    jerseyNumber: faker.datatype.number(100),
    fullName: faker.name.findName(),
    primaryPosition: {
      name: faker.lorem.word()
    },
    nationality: "SWE",
    capHit: Math.random()*1000,
    rosterStatus: faker.datatype.boolean() ? "Y" : "N"
  }));
}; 

export const mockNews = (newsCount) => {
  return Array.from({length: newsCount}, () => ({
    title: faker.lorem.words(4)
  }));
};

export const mockGame = () => {
  let baseGame = {
    teams: {
      home: {
        team: { id: 1, name: "Test 1" },
        leagueRecord: { wins: 0, losses: 0, ot: 0 },
        shotsOnGoal: 1,
        goals: 1,
      },
      away: {
        team: { id: 2, name: "Test 2" },
        leagueRecord: { wins: 0, losses: 0, ot: 0 },
        shotsOnGoal: 2,
        goals: 2,
      },
    },
  };
  return baseGame;
};

export const mockTeamGame = () => {
  let baseGame = {
    gamePk: faker.datatype.number(),
    team: {
      team: { id: 1, name: "Test 1" },
      leagueRecord: { wins: 0, losses: 0, ot: 0 },
      shotsOnGoal: 1,
      goals: 1,
    },
    opponent: {
      team: { id: 2, name: "Test 2" },
      leagueRecord: { wins: 0, losses: 0, ot: 0 },
      shotsOnGoal: 2,
      goals: 2,
    },
    date: faker.datatype.datetime().toDateString()
  };
  return baseGame;
};