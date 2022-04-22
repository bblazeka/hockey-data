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