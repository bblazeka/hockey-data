const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser-graphql");
const app = express();

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
var fs = require('fs');

const { Database } = require('./comm/dbhandler.js');
const analysis = require('./services/analysis/index.js');
const game = require('./services/game/index.js');
const team = require('./services/team/index.js');
const news = require('./services/news/index.js');
const league = require('./services/league/index.js');
const player = require('./services/player/index.js');
const util = require('./services/util/index.js');

var mainSchema = fs.readFileSync('schema.gql', 'utf8');
var analysisSchema = fs.readFileSync('./services/analysis/schema.gql', 'utf8');
var gameSchema = fs.readFileSync('./services/game/schema.gql', 'utf8');
var leagueSchema = fs.readFileSync('./services/league/schema.gql', 'utf8');
var newsSchema = fs.readFileSync('./services/news/schema.gql', 'utf8');
var teamSchema = fs.readFileSync('./services/team/schema.gql', 'utf8');
var playerSchema = fs.readFileSync('./services/player/schema.gql', 'utf8');
var utilSchema = fs.readFileSync('./services/util/schema.gql', 'utf8');
var schemaDefinition = `${analysisSchema} ${mainSchema} ${newsSchema} ${gameSchema} ${leagueSchema} ${teamSchema} ${playerSchema} ${utilSchema}`;

let whitelist = ['http://localhost:3000', 'http://abc.com'];

// Construct a schema, using GraphQL schema language
var schema = buildSchema(schemaDefinition);
 
// The root provides a resolver function for each API endpoint
var root = {
  analysis: analysis.getAnalysis,
  game: game.getGame,
  gamesBetweenTeams: game.gamesBetweenTeams,
  todaysGames: game.getTodaysGames,
  team: team.getTeam,
  teams: team.getTeams,
  teamLocations: team.getTeamLocations,
  player: player.getPlayer,
  searchPlayerByName: player.getPlayerByName,
  selectedPlayers: player.getSelectedPlayers,
  addSelectedPlayer: player.addSelectedPlayer,
  deleteSelectedPlayer: player.deleteSelectedPlayer,
  clearSelectedPlayers: player.clearSelectedPlayers,
  articles: news.getArticles,
  tweets: news.getTweets,
  twitterApiStatus: news.getTwitterApiStatus,
  schedule: league.getSchedule,
  scheduleByTeam: team.getTeamSchedule,
  standings: league.getStandings,
  geocode: util.geocode,
};

const port = 4000;

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin 
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) === -1) {
      var message = 'The CORS policy for this origin doesn\'t ' +
        'allow access from the particular origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));
app.use(bodyParser.graphql());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

async function init() {
  console.log('Initializing database...');
  
  var database = new Database();
  await database.init();
  analysis.init(database);
  game.init(database);
  team.init(database);
  player.init(database);
  league.init(database);
}

app.listen(port, async () => {
  await init();

  console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);
});

const handle = serverless(app);

module.exports.handler = async (event, context) => {
  await init();
  const res = await handle(event, context);
  return res;
};

// Handler