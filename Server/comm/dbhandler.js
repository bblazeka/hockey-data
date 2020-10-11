const db = require('../keys.json')

const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: db.user,
      password: db.password
    },
    type: "default"
  },
  server: db.datasource,
  options: {
    database: db.initialcatalog,
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    //queryDatabase(x, callback);
  }
});

function queryDatabase(query, callback) {
    console.log(query)
  // Read all rows from table
  const request = new Request(
    "SELECT * from dbo.Teams",
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
      console.log(columns)
    return callback(columns);
  });

  connection.execSql(request);
}

module.exports = {
    queryDatabase
}