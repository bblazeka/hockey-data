const https = require('https')

function espnApiRequest(path) {
  var options = {
    hostname: 'site.api.espn.com',
    //port: 443,
    path: path,
    method: 'GET'
  }

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      return new Promise((resolve, reject) => {
        try 
        {
          resolve(JSON.parse(d))
        }
        catch(ex)
        {
          reject(ex)
        }
      });
    })
  })

  req.on('error', error => {
    console.error(error)
  })

  req.end()
}

async function nhlApiRequest(path) {
  var options = {
    hostname: 'statsapi.web.nhl.com',
    //port: 443,
    path: path,
    method: 'GET'
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
  
      res.on('data', d => {
        resolve(JSON.parse(d))
      })
    })

    req.on('error', error => {
      console.error(error)
      reject(error)
    })
  
    req.end()
  });

  


}

module.exports = {
  nhlApiRequest,
  espnApiRequest
}