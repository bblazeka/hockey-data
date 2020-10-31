const db = require('./comm/dbhandler.js')
const apicomm = require('./comm/apihandler');

const express = require('express')
const app = express()
const port = 52700

app.get('/', (req, res) => {
    res.send("Root")
})

app.get('/api/player/:id', (req, res) => {
  apicomm.nhlApiRequest(`/api/v1/people/${req.params.id}`, function(result){
    res.send(result)
  })
})

app.get('/api/team/:id', (req, res) => {
  apicomm.nhlApiRequest(`/api/v1/teams/${req.params.id}`, function(result){
    res.send(result)
  })
})

app.get('/api/news', (req, res) => {
  apicomm.espnApiRequest('/apis/site/v2/sports/hockey/nhl/news', function(result){
    res.send(result)
  })
})

app.get('/api/scoreboard', (req, res) => {
  apicomm.espnApiRequest('/apis/site/v2/sports/hockey/nhl/scoreboard', function(result){
    res.send(result)
  })
})

// GET api/game/{date}?homeId={homeId}&awayId={awayId}
// https://statsapi.web.nhl.com/api/v1/standings?season={startyear}{endyear}
// https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&startDate={0}&endDate={1}
// https://statsapi.web.nhl.com/api/v1/schedule?expand=schedule.linescore&teamId={0}&startDate={1}&endDate={2}
/*
            // https://statsapi.web.nhl.com/api/v1/game/2019020056/boxscore
            return string.Format("https://statsapi.web.nhl.com/api/v1/game/{0}/boxscore", id);
            */
// https://statsapi.web.nhl.com/api/v1/people/{0}/stats?stats=statsSingleSeason&season={1}
/*
            // http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/teams/1
            return string.Format("https://statsapi.web.nhl.com/api/v1/teams/{0}?expand=team.roster", id);
*/

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})