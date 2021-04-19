const apicomm = require('../comm/apihandler');
const dbhandler = require('../comm/dbhandler.js');

async function run() {

  var db = new dbhandler.Database();
  await db.init();

  try {
    var response = await apicomm.nhlApiRequest('/api/v1/standings?season=20202021');

    // https://statsapi.web.nhl.com/api/v1/teams/6?hydrate=roster(season=20202021,person(name,stats(splits=statsSingleSeason)))

    const teamAnalysisCollection = db.getCollection('analysis');
    
    var res = response.records.map(async (record)=>{
      record.teamRecords.map(async (teamRecord)=>{
        var teamStats = await apicomm.nhlApiRequest(`/api/v1/teams/${teamRecord.team.id}/stats`);
        const options = { upsert: true };
        const filter = { id: teamRecord.team.id };
        var rankings = teamStats.stats[1].splits[0].stat;
        Object.keys(rankings).forEach(function(key){ rankings[key] = parseInt(rankings[key]); });
        const updateDoc = {
          $set: {
            id: teamRecord.team.id,
            team: teamRecord.team,
            leagueRecord: teamRecord.leagueRecord,
            points: teamRecord.points,
            regulationWins: teamRecord.regulationWins,
            leagueRank: parseInt(teamRecord.leagueRank),
            leagueL10Rank: parseInt(teamRecord.leagueL10Rank),
            leagueHomeRank: parseInt(teamRecord.leagueHomeRank),
            leagueRoadRank: parseInt(teamRecord.leagueRoadRank),
            ppLeagueRank: parseInt(teamRecord.ppLeagueRank),
            divisionRank: parseInt(teamRecord.divisionRank),
            divisionL10Rank: parseInt(teamRecord.divisionL10Rank),
            divisionHomeRank: parseInt(teamRecord.divisionHomeRank),
            divisionRoadRank: parseInt(teamRecord.divisionRoadRank),
            ppDivisionRank: parseInt(teamRecord.ppDivisionRank),
            conferenceRank: parseInt(teamRecord.conferenceRank),
            conferenceL10Rank: parseInt(teamRecord.conferenceL10Rank),
            conferenceHomeRank: parseInt(teamRecord.conferenceHomeRank),
            conferenceRoadRank: parseInt(teamRecord.conferenceRoadRank),
            ppConferenceRank: parseInt(teamRecord.ppConferenceRank),
            row: teamRecord.row,
            statsSingleSeason: teamStats.stats[0].splits[0].stat,
            regularSeasonStatRankings: rankings,
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