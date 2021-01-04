
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

app.get('/api/teams/:id/schedule', (req, res) => {
  apicomm.nhlApiRequest(`/api/v1/schedule?teamId=${req.params.id}&startDate=${req.query.start}&endDate=${req.query.end}`).then(result => res.send(result))
})

app.get('/api/scoreboard', (_req, res) => {
  apicomm.espnApiRequest('/apis/site/v2/sports/hockey/nhl/scoreboard', function (result) {
    res.send(result)
  })
})

app.get('/api/tweets/apistatus', (_req, res) => {
  twtcomm.getLimitStatus().then(result => res.send(result))
})

app.get('/api/tweets/:name', (req, res) => {
  twtcomm.getTweets(req.params.name).then(result => res.send(result))
})