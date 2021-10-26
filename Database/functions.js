const { MongoClient } = require("mongodb");
const db = require("./keys/db.json");
const apicomm = require("./adapters/apihandler");

async function fetchTeams() {
  const teams = [];
  for (i = 1; i < 56; i++) {
    try {
      await apicomm
        .nhlApiRequest(`/api/v1/teams/${i}?expand=team.roster`)
        .then(function (res) {
          teams.push(res.teams[0]);
        });
    } catch (ex) {
      console.log(ex);
    }
  }

  return new Promise((resolve, reject) => {
    resolve(teams);
  });
}

async function fetchGames() {
  const games = await apicomm.nhlApiRequest(
    "/api/v1/schedule?startDate=2021-10-01&endDate=2022-05-01"
  );
  return games.dates;
}

module.exports = {
  fetchTeams,
  fetchGames,
};
