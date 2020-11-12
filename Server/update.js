const { MongoClient } = require("mongodb");
const db = require('./db.json');
// Replace the uri string with your MongoDB deployment's connection string.
const apicomm = require('./comm/apihandler');
const { getPlayers } = require("./comm/dbhandler");

const client = new MongoClient(db.uri);

async function fetchTeams() {
  const teams = []
  for (i = 1; i < 56; i++) {
    try {
      await apicomm.nhlApiRequest(`/api/v1/teams/${i}?expand=team.roster`).then(function (res) {
        teams.push(res.teams[0]);
      })
    }
    catch (ex) {
      console.log(ex);
    }
  }

  return new Promise((resolve, reject) => {
    resolve(teams);
  });
}

async function run() {

  var teams = []

  await client.connect();

  const database = client.db("hockey-data", { useUnifiedTopology: true });
  const collection = database.collection("players");
  
    var players = await getPlayers();

    for(let playerTemp of players)
    {
      var response = await apicomm.nhlApiRequest(`/api/v1/people/${playerTemp.id}`);
      var player = response.people[0]

      const options = { upsert: true };
      const filter = { id: player.id };

      const updateDoc = {
        $set: {
          fullName: player.fullName,
          firstName: player.firstName,
          lastName: player.lastName,
          primaryNumber: player.primaryNumber,
          birthDate: player.birthDate,
          positon: player.position,
          height: parseInt(player.height.split(" ")[0].replace(/\D/g,''))/3.2808*100 + parseInt(player.height.split(" ")[1].replace(/\D/g,''))/0.39370,
          weight: player.weight * 0.45359237,
          birthCity: player.birthStateProvince != undefined ? `${player.birthCity},${player.birthStateProvince},${player.birthCountry}` : `${player.birthCity},${player.birthCountry}`,
          nationality: player.nationality,
          active: player.active,
          alternateCaptain: player.alternateCaptain,
          captain: player.captain,
          rookie: player.rookie,
          shootsCatches: player.shootsCatches,
          rosterStatus: player.rosterStatus,
          currentTeam: player.currentTeam,
          primaryPosition: player.primaryPosition
        },
      };
      try {
        const queryResult = await collection.updateOne(filter, updateDoc, options);
        console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${player.fullName}`);
      } catch (ex) {
        console.log(ex)
      }
    }
    /*
  var x = await fetchTeams().then((res) => teams = res)
/*
  try {

    await client.connect();

    const database = client.db("hockey-data", { useUnifiedTopology: true });
    const collection = database.collection("teams");

    for (let team of teams) {
      const options = { upsert: true };
      const filter = { id: team.id };


      const updateDoc = {
        $set: {
          name: team.name,
          abbreviation: team.abbreviation
        },
      };
      try {
        const queryResult = await collection.updateOne(filter, updateDoc, options);
        console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${team.name}`);
      } catch (ex) {
        console.log(ex)
      }
    }

  } finally {
    await client.close();
  }

  try {

    await client.connect();

    const database = client.db("hockey-data", { useUnifiedTopology: true });
    const collection = database.collection("players");

    for (let team of teams) {
      var roster = team.roster.roster;
      for (let player of roster) {
        const options = { upsert: true };
        const filter = { id: player.person.id };


        const updateDoc = {
          $set: {
            fullName: player.person.fullName,
            jerseyNumber: player.jerseyNumber,
            positon: player.position
          },
        };
        try {
          const queryResult = await collection.updateOne(filter, updateDoc, options);
          console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${player.person.fullName}`);
        } catch (ex) {
          console.log(ex)
        }
      }

    }

  } finally {
    await client.close();
  }*/
}

run().catch(console.dir);