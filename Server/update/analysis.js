const apicomm = require('../comm/apihandler');
const dbhandler = require('../comm/dbhandler.js');

async function run() {

  var db = new dbhandler.Database();
  await db.init();

  try {
    var response = await apicomm.nhlApiRequest('/api/v1/standings?season=20202021');

    //const teamsCollection = db.getCollection('teams');

    const teamAnalysisCollection = db.getCollection('analysis');

    //var teams = await teamsCollection.find({ active: true }).toArray();
    
    var res = response.records.map(async (record)=>{
      record.teamRecords.map(async (teamRecord)=>{
        const options = { upsert: true };
        const filter = { id: teamRecord.team.id };
        const updateDoc = {
          $set: {
            id: teamRecord.team.id,
            team: teamRecord.team,
            leagueRecord: teamRecord.leagueRecord,
            points: teamRecord.points,
            regulationWins: teamRecord.regulationWins,
            leagueRank: parseInt(teamRecord.leagueRank),
            leagueL10Rank: parseInt(teamRecord.leagueL10Rank),
            divisionRank: parseInt(teamRecord.divisionRank),
            divisionL10Rank: parseInt(teamRecord.divisionL10Rank),
            row: teamRecord.row,
            lastUpdated: teamRecord.lastUpdated
          },
        };
        try {
          const queryResult = await teamAnalysisCollection.updateOne(filter, updateDoc, options);
          console.log(`${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s)`);
        } catch (ex) {
          console.log(ex);
        }
      });
    });
  } finally {
    Promise.all(res).then(() => {
      console.log('Finished.');
    });
  }
}

run().catch(console.dir);