const https = require('https')

var options = {
  hostname: 'statsapi.web.nhl.com',
  port: 443,
  path: '/api/v1/people/{0}',
  method: 'GET'
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
  nhlApiRequest
}