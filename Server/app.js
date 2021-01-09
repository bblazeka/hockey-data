const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
var fs = require('fs');

const { Database } = require('./comm/dbhandler.js');
const team = require('./services/team/index.js');
const news = require('./services/news/index.js');
const league = require('./services/league/index.js');
const player = require('./services/player/index.js');

var mainSchema = fs.readFileSync('schema.gql', "utf8");
var leagueSchema = fs.readFileSync('./services/league/schema.gql', "utf8");
var newsSchema = fs.readFileSync('./services/news/schema.gql', "utf8");
var teamSchema = fs.readFileSync('./services/team/schema.gql', "utf8");
var playerSchema = fs.readFileSync('./services/player/schema.gql', "utf8");
var schemaDefinition = `${mainSchema} ${newsSchema} ${leagueSchema} ${teamSchema} ${playerSchema}`

let whitelist = ['http://localhost:3000', 'http://abc.com']

// Construct a schema, using GraphQL schema language
var schema = buildSchema(schemaDefinition);
 
// The root provides a resolver function for each API endpoint
var root = {
  team: team.getTeam,
  teams: team.getTeams,
  player: player.getPlayer,
  searchPlayerByName: player.getPlayerByName,
  selectedPlayers: player.getSelectedPlayers,
  addSelectedPlayer: player.addSelectedPlayer,
  deleteSelectedPlayer: player.deleteSelectedPlayer,
  articles: news.getArticles,
  tweets: news.getTweets,
  twitterApiStatus: news.getTwitterApiStatus,
  schedule: league.getSchedule,
  standings: league.getStandings,
  gamesBetweenTeams: league.gamesBetweenTeams,
  game: league.getGame,
};

const port = 4000
var app = express();

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
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.listen(port, async () => {
  var database = new Database();
  await database.init();
  team.init(database);
  player.init(database);
  news.init(database);
  league.init(database);
  console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`)
})