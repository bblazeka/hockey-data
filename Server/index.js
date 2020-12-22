const apicomm = require('./comm/apihandler');
const twtcomm = require('./comm/twitterhandler');
const dbhandler = require('./comm/dbhandler.js');

const express = require('express');
const cors = require('cors')
const app = express()
const port = 52700

let whitelist = ['http://localhost:3000', 'http://abc.com']

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

app.get('/', (_req, res) => {
  res.send("Root")
})

app.get('/api/players/:id', (req, res) => {
  dbhandler.getPlayer(req.params.id).then(player => {
    apicomm.nhlApiRequest(`/api/v1/people/${req.params.id}/stats?stats=yearByYear`)
      .then(result => {
        res.send({
          ...player,
          nhlstats: result.stats[0].splits.filter(el => el.league.id === 133),
          careerstats: result.stats[0].splits
        })
      })
      .catch(err => console.log(err));
  })
})

app.get('/api/players/:id/season', (req, res) => {
  dbhandler.getPlayer(req.params.id).then(player => {
    apicomm.nhlApiRequest(`/api/v1/people/${req.params.id}/stats?stats=statsSingleSeason&season=${req.query.id}`)
      .then(result => {
        res.send({
          ...player,
          stats: result.stats[0].splits
        })
      })
      .catch(err => console.log(err));
  })
})

app.get('/api/players/search/:name', (req, res) => {
  dbhandler.getPlayerByName(req.params.name).then(players => {
    res.send(players);
  })
})

app.get('/api/teams', (_req, res) => {
  dbhandler.getTeams().then(response => {
    res.send(response.filter(team => team.active == true).sort((a, b) => (a.name > b.name) ? 1 : -1));
  }).catch(err => console.log(err));
})

app.get('/api/teams/:id', (req, res) => {
  dbhandler.getTeam(parseInt(req.params.id)).then(response => {
    var players = response.rosterResponse;
    res.send({
      ...response,
      goalies: players.filter(p => p.primaryPosition.type == "Goalie"),
      defenders: players.filter(p => p.primaryPosition.type == "Defenseman"),
      forwards: players.filter(p => p.primaryPosition.type == "Forward")
    });
  }).catch(err => console.log(err));
})

app.get('/api/teams/:id/schedule', (req, res) => {
  apicomm.nhlApiRequest(`/api/v1/schedule?teamId=${req.params.id}&startDate=${req.query.start}&endDate=${req.query.end}`).then(result => res.send(result))
})

app.get('/api/news', (_req, res) => {
  apicomm.espnApiRequest('/apis/site/v2/sports/hockey/nhl/news').then(response => {
    res.send(response.articles);
  }).catch(err => console.log(err));
})

app.get('/api/scoreboard', (_req, res) => {
  apicomm.espnApiRequest('/apis/site/v2/sports/hockey/nhl/scoreboard', function (result) {
    res.send(result)
  })
})

app.get('/api/standings/:season', (req, res) => {
  apicomm.nhlApiRequest(`/api/v1/standings?season=${req.params.season}`).then(result => res.send(result.records))
})

app.get('/api/schedule', async (req, res) => {
  var teams = await (await dbhandler.getTeams()).sort((a, b) => (a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0 );
  dbhandler.getSchedule(`${req.query.start} 00:00:00`, `${req.query.end} 00:00:00`).then(games => {
    for (let team of teams) {
      team.games = JSON.parse(JSON.stringify(games)).filter(g => g.home.team.id === team.id || g.away.team.id === team.id).map(el => {
        el.opponent = (el.home.team.id === team.id) ? el.away : el.home;
        return el;
      });
    }
    res.send(teams.filter(team => team.games !== undefined && team.games.length > 0));
  })
})

// TEST:2019020056
app.get('/api/game/:id', async (req, res) => {
  const linescore = await apicomm.nhlApiRequest(`/api/v1/game/${req.params.id}/linescore`);
  apicomm.nhlApiRequest(`/api/v1/game/${req.params.id}/boxscore`).then(result => {
    result.id = req.params.id
    result.linescore = linescore;
    res.send(result)
  })
})

app.get('/api/games/search', (req, res) => {
  dbhandler.getGamesWithTeams(req.query.homeId, req.query.awayId).then(result => res.send(result))
})

app.get('/api/tweets/apistatus', (_req, res) => {
  twtcomm.getLimitStatus().then(result => res.send(result))
})

app.get('/api/tweets/:name', (req, res) => {
  twtcomm.getTweets(req.params.name).then(result => res.send(result))
})

app.get('/api/tweets/search/:query', (req, res) => {
  twtcomm.searchTweets(req.params.query, 10, 'en', "popular").then(result => {
    res.send(result)
  })
})

app.listen(port, async () => {
  await dbhandler.init();
  console.log(`Example app listening at http://localhost:${port}`)
})