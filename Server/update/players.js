const { DateTime } = require('luxon');
const _ = require('lodash');

const apicomm = require('../comm/apihandler');
const dbhandler = require('../comm/dbhandler.js');
const scrapper = require('../comm/scrapinghandler.js');

async function run() {

  const db = new dbhandler.Database();
  await db.init();

  try {

    const playerCollection = db.getCollection('players');

    const players = await playerCollection.find({ active: true }).toArray();

    for (let playerTemp of players) {

      if (playerTemp.active && ((DateTime.fromJSDate(playerTemp.lastUpdate) < DateTime.now().minus({ weeks: 1 }).endOf('day')) || playerTemp.lastUpdate === null)) {

        const response = await apicomm.nhlApiRequest(`/api/v1/people/${playerTemp.id}`);
        const player = response.people[0];

        const options = { upsert: true };
        const filter = { id: player.id };

        const capHit = await scrapper.scrapPlayerCapHit(playerTemp.fullName);
        if (_.isNil(capHit)) {
          if (!_.isNil(playerTemp.altName)) {
            capHit = await scrapper.scrapPlayerCapHit(playerTemp.altName);
          }
          else {
            capHit = await scrapper.scrapPlayerCapHit(`${playerTemp.fullName}1`);
          }
        }

        const updateDoc = {
          $set: {
            fullName: player.fullName,
            altName: playerTemp.altName,
            firstName: player.firstName,
            lastName: player.lastName,
            primaryNumber: parseInt(player.primaryNumber),
            currentAge: player.currentAge,
            birthDate: player.birthDate,
            height: Math.ceil(parseInt(player.height.split(' ')[0].replace(/\D/g, '')) / 3.2808 * 100 + parseInt(player.height.split(' ')[1].replace(/\D/g, '')) / 0.39370),
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
            capHit,
            lastUpdate: new Date()
          },
        };
        try {
          const queryResult = await playerCollection.updateOne(filter, updateDoc, options);
          console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${player.fullName}`);
        } catch (ex) {
          console.log(ex);
        }
      }


    }

  } finally {
    db.closeClient();
  }
}

run().catch(console.dir);