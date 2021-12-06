const dbhandler = require("./adapters/dbhandler.js");
const apicomm = require("./adapters/apihandler.js");

async function run(startDate = "2021-10-01", endDate = "2022-05-01") {
  const db = new dbhandler.Database();
  await db.init();

  const games = await apicomm.nhlApiRequest(
    `/api/v1/schedule?startDate=${startDate}&endDate=${endDate}`
  );
  const { dates } = games;
  let updatedGames = 0;
  console.log("Skipping games that are already finished...");
  try {
    const collection = db.getCollection("games");
    for (let date of dates) {
      for (let game of date.games) {
        const options = { upsert: true };
        const filter = { gamePk: game.gamePk };
        const updateDoc = {
          $set: {
            gameType: game.gameType,
            season: game.season,
            date: date.date,
            gameDate: new Date(game.gameDate),
            home: game.teams.home,
            away: game.teams.away,
            status: game.status,
            venue: game.venue,
            lastUpdate: new Date(),
          },
        };
        try {
          const queryResult = await collection.updateOne(
            filter,
            updateDoc,
            options
          );
          console.log(
            `${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${game.gamePk}`
          );
          updatedGames++;
        } catch (ex) {
          console.log(ex);
        }
      }
    }
  } finally {
    await db.closeClient();
    console.log(`Updated ${updatedGames} game(s).`);
  }
}

exports.handler = async (event) => {
  await run(event.startDate, event.endDate);
};

run().catch(console.dir);
