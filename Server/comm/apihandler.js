const https = require('https')

function espnApiRequest(path, callback) {
  var options = {
    hostname: 'site.api.espn.com',
    //port: 443,
    path: path,
    method: 'GET'
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      return callback(JSON.parse(d))
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.end()
}

function nhlApiRequest(path, callback) {
  var options = {
    hostname: 'statsapi.web.nhl.com',
    //port: 443,
    path: path,
    method: 'GET'
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      return callback(JSON.parse(d))
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.end()
}

module.exports = {
  nhlApiRequest,
  espnApiRequest
}