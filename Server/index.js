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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})