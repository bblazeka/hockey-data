const db = require('./comm/dbhandler.js')
const apicomm = require('./comm/apihandler');

const express = require('express');
const dbhandler = require('./comm/dbhandler.js');
const app = express()
const port = 52700

app.get('/', (req, res) => {
    res.send("Root")
})

app.get('/api/player/:id', (req, res) => {
  dbhandler.getPlayer(req.params.id).then(player => {
    apicomm.nhlApiRequest(`/api/v1/people/${req.params.id}/stats?stats=yearByYear`)
    .then(result => {
      res.send({
        ...player,
        stats: result.stats[0].splits
      })
    })
    .catch(err => console.log(err));
  })
})

app.get('/api/player/:id/season', (req, res) => {
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

app.get('/api/team/:id', (req, res) => {
  dbhandler.getTeam(parseInt(req.params.id)).then(response => {
    res.send(response);
  }).catch(err => console.log(err));
})

app.get('/api/team/:id/schedule', (req, res) => {
  apicomm.nhlApiRequest(`/api/v1/schedule?teamId=${req.params.id}&startDate=${req.query.start}&endDate=${req.query.end}`).then(result => res.send(result))
})

app.get('/api/news', (req, res) => {
  apicomm.espnApiRequest('/apis/site/v2/sports/hockey/nhl/news').then(response => {
    res.send(response.articles);
  }).catch(err => console.log(err));
})

app.get('/api/scoreboard', (req, res) => {
  apicomm.espnApiRequest('/apis/site/v2/sports/hockey/nhl/scoreboard', function(result){
    res.send(result)
  })
})

app.get('/api/standings/:season', (req, res) => {
  apicomm.nhlApiRequest(`/api/v1/standings?season=${req.params.season.substring(0,4)}${req.params.season.substring(4,8)}`).then(result => res.send(result))
})

app.get('/api/schedule/:start', (req, res) => {
  apicomm.nhlApiRequest(`/api/v1/schedule?startDate=${req.params.start}&endDate=${req.query.end}`).then(result => res.send(result))
})

// TEST:2019020056
app.get('/api/game/:id', (req, res) => {
  apicomm.nhlApiRequest(`/api/v1/game/${req.params.id}/boxscore`).then(result => res.send(result))
})


app.listen(port, async () => {
  await dbhandler.init();
  console.log(`Example app listening at http://localhost:${port}`)
})