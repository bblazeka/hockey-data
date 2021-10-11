import serverless from "serverless-http";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import cors from "cors";

import * as analysis from "./services/analysis";
import * as game from "./services/game";
import * as team from "./services/team";
import * as news from "./services/news";
import * as league from "./services/league";
import * as player from "./services/player";
import * as util from "./services/util";

import { Database } from "./adapters/dbhandler";
import { graphql } from "body-parser-graphql";

const app = express();

let databaseInitialized = false;

// Construct a schema, using GraphQL schema language
const schema = loadSchemaSync("./services/**/*.gql", {
  // load from multiple files using glob
  loaders: [new GraphQLFileLoader()],
});

// The root provides a resolver function for each API endpoint
const root = {
  analysis: analysis.getAnalysis,
  game: game.getGame,
  gamesBetweenTeams: game.gamesBetweenTeams,
  todaysGames: game.getTodaysGames,
  team: team.getTeam,
  teams: team.getActiveTeams,
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
  divisionsWithTeams: league.divisionsWithTeams,
  geocode: util.geocode,
};

const port = 4000;

app.use(
  cors({
    credentials: true,
  })
);
app.use(graphql());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

async function init() {
  console.log("Initializing database...");

  if (!databaseInitialized) {
    const database = new Database();
    await database.init();
    analysis.init(database);
    game.init(database);
    team.init(database);
    player.init(database);
    league.init(database);

    databaseInitialized = true;
  }
}

app.listen(port, async () => {
  await init();

  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`
  );
});

// Handler
const handle = serverless(app);

module.exports.handler = async (event, context) => {
  await init();
  const res = await handle(event, context);
  return res;
};
