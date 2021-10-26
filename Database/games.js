const { MongoClient } = require("mongodb");
const db = require("./keys/db.json");
// Replace the uri string with your MongoDB deployment's connection string.
const apicomm = require("./adapters/apihandler");
const dbhandler = require("./adapters/dbhandler.js");
const { fetchGames } = require("./functions.js");

const client = new MongoClient(db.uri);

async function run() {
  const db = new dbhandler.Database();
  await db.init();

  await client.connect();

  const dates = await fetchGames();

  console.log("Skipping games that are already finished...");
  try {
    const database = client.db("hockey-data", { useUnifiedTopology: true });
    const collection = database.collection("games");
    for (let date of dates) {
      for (let game of date.games) {
        if (game.status.statusCode === "7") {
          continue;
        }
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
        } catch (ex) {
          console.log(ex);
        }
      }
    }
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
