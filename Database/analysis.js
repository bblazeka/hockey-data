const apicomm = require("./adapters/apihandler");
const dbhandler = require("./adapters/dbhandler.js");
const scrapping = require("./adapters/scrapinghandler");
const config = require("./config.json");

function abbreviateName(name) {
  if (name.includes(".")) {
    return name;
  }
  return name
    .split(" ")
    .map((p) => `${p[0]}.`)
    .join(" ");
}

async function run() {
  const season = config.currentSeason;

  const db = new dbhandler.Database();
  await db.init();

  const response = await apicomm.nhlApiRequest(
    `/api/v1/standings?season=${season}`
  );

  try {
    const teamAnalysisCollection = db.getCollection("analysis");

    for (let record of response.records) {
      for (let teamRecord of record.teamRecords) {
        const playerStats = await apicomm.nhlApiRequest(
          `/api/v1/teams/${teamRecord.team.id}?hydrate=roster(season=${season},person(stats(splits=statsSingleSeason)))`
        );

        const skaterScoringStats = await apicomm.enhancedNhlApiRequest(
          `/stats/rest/en/skater/scoringRates?isAggregate=false&isGame=false&start=0&limit=50&factCayenneExp=gamesPlayed>=1&cayenneExp=teamId=${teamRecord.team.id} and gameTypeId=2 and seasonId<=${season} and seasonId>=${season}`
        );

        const skaterPowerplayStats = await apicomm.enhancedNhlApiRequest(
          `/stats/rest/en/skater/powerplay?isAggregate=false&isGame=false&start=0&limit=50&factCayenneExp=gamesPlayed>=1&cayenneExp=teamId=${teamRecord.team.id} and gameTypeId=2 and seasonId<=${season} and seasonId>=${season}`
        );

        const enhancedGoalieStats = await apicomm.enhancedNhlApiRequest(
          `/stats/rest/en/goalie/advanced?isAggregate=false&isGame=false&start=0&limit=50&factCayenneExp=gamesPlayed>=1&cayenneExp=teamId=${teamRecord.team.id} and gameTypeId=2 and seasonId<=${season} and seasonId>=${season}`
        );

        const enhancedSkaterStats = [
          ...skaterScoringStats.data
            .concat(skaterPowerplayStats.data)
            .reduce(
              (m, o) =>
                m.set(o.playerId, Object.assign(m.get(o.playerId) || {}, o)),
              new Map()
            )
            .values(),
        ];

        const playersRoster = playerStats.teams[0].roster.roster;
        const fmtRoster = playersRoster
          .filter((p) => {
            return (
              p.person.stats[0].splits != null &&
              p.person.stats[0].splits.length > 0
            );
          })
          .map((p) => {
            let enhancedStats = enhancedSkaterStats.find(
              (enhancedStats) => enhancedStats.playerId === p.person.id
            );
            if (!enhancedStats) {
              enhancedStats = enhancedGoalieStats.data.find(
                (enhancedStats) => enhancedStats.playerId === p.person.id
              );
            }
            return {
              id: p.person.id,
              abbrName: `${abbreviateName(p.person.firstName)} ${
                p.person.lastName
              }`,
              fullName: p.person.fullName,
              currentAge: p.person.currentAge,
              stats: p.person.stats[0].splits[0].stat,
              advancedStats: enhancedStats,
            };
          });

        const lines = await scrapping.scrapLines(teamRecord.team.name);

        const teamStats = await apicomm.nhlApiRequest(
          `/api/v1/teams/${teamRecord.team.id}/stats`
        );
        const options = { upsert: true };
        const filter = { id: teamRecord.team.id };
        const rankings = teamStats.stats[1].splits[0].stat;
        Object.keys(rankings).forEach(function (key) {
          rankings[key] = parseInt(rankings[key]);
        });

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
            rosterStats: fmtRoster,
            lines,
            lastUpdated: teamRecord.lastUpdated,
          },
        };
        try {
          const queryResult = await teamAnalysisCollection.updateOne(
            filter,
            updateDoc,
            options
          );
          console.log(
            `${queryResult.matchedCount} document(s) matched the filter, updated ${queryResult.modifiedCount} document(s): ${teamRecord.team.name}`
          );
        } catch (ex) {
          console.log(ex);
        }
      }
    }
  } finally {
    await db.closeClient();
  }
}

run().catch(console.dir);
