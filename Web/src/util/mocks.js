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

export const mockLineupPlayer = () => {
  const player = mockPlayers(1)[0];
  return {
    id: player.id,
    number: player.jerseyNumber,
    name: player.fullName
  };
};

export const mockNews = (newsCount) => {
  return Array.from({length: newsCount}, () => ({
    title: faker.lorem.words(4)
  }));
};

export const mockSocial = (socialCount) => {
  return Array.from({length: socialCount}, () => ({
    id: faker.datatype.number(10000),
    url: `${faker.lorem.words(1)}.com`,
    title: faker.lorem.words(4),
    text:faker.lorem.paragraph(),
    user: {
      name: faker.name.findName(),
      screenName: faker.name.firstName()
    },
    entities: Array.from({length: faker.datatype.number(4)}, () => ({
      text: faker.lorem.words(3)
    }))
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

export const mockColumnsAndData = () => {
  const columnNames = [{
    title: "Col1",
    property: "val1",
    link: true,
  }, {
    title: "Col2",
    property: "val2",
  }, {
    title: "Col3",
    property: "val3",
    percent: true
  }];
  const dataSource = [{
    val1: "hey",
    val2: 1,
    val3: 0.6123,
  },
  {
  val1: "ey",
  val2: 2,
  val3: 0.98345
  }];
  return {
    columnNames,
    dataSource
  };
};