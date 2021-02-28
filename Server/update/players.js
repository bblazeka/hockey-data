const apicomm = require('../comm/apihandler');
const dbhandler = require('../comm/dbhandler.js');

async function run() {

  var db = new dbhandler.Database();
  await db.init();


  try {

    const playerCollection = db.getCollection("players");

    var players = await playerCollection.find({ active: true }).toArray();

    console.log(`updating ${players.length} players...`)
    for (let playerTemp of players) {
      var response = await apicomm.nhlApiRequest(`/api/v1/people/${playerTemp.id}`);
      var player = response.people[0]

      const options = { upsert: true };
      const filter = { id: player.id };
      const updateDoc = {
        $set: {
          fullName: player.fullName,
          firstName: player.firstName,
          lastName: player.lastName,
          primaryNumber: parseInt(player.primaryNumber),
          currentAge: player.currentAge,
          birthDate: player.birthDate,
          positon: player.position,
          height: Math.ceil(parseInt(player.height.split(" ")[0].replace(/\D/g, '')) / 3.2808 * 100 + parseInt(player.height.split(" ")[1].replace(/\D/g, '')) / 0.39370),
          weight: Math.floor(player.weight * 0.45359237),
          birthCity: player.birthStateProvince != undefined ? `${player.birthCity}, ${player.birthStateProvince}, ${player.birthCountry}` : `${player.birthCity}, ${player.birthCountry}`,
          nationality: player.nationality,
          active: player.active,
          alternateCaptain: player.alternateCaptain,
          captain: player.captain,
          rookie: player.rookie,
          shootsCatches: player.shootsCatches,
          rosterStatus: player.rosterStatus,
          currentTeam: player.currentTeam,
          primaryPosition: player.primaryPosition,
          lastUpdate: new Date()
        },
      };
      try {
        const queryResult = await playerCollection.updateOne(filter, updateDoc, options);
        console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${player.fullName}`);
      } catch (ex) {
        console.log(ex)
      }
    }

  } finally {
    db.closeClient();
  }
}

run().catch(console.dir);