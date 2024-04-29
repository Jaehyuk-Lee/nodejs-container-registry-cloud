const express = require('express');
const app = express();
const mysql = require('mysql2');
const config = require('./config/config.js');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers',
    'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization');
  next();
});

app.get('/search', (req, res) => {
  console.log("name: " + req.query.name);

  // create the connection to database
  const connection = mysql.createConnection({
    host: config.DB_IP,
    user: config.USER_NAME,
    password: config.USER_PASSWORD,
    database: config.DATABASE_NAME
  });

  connection.query(
    `SELECT * FROM ${config.TABLE_NAME} WHERE Name = '${req.query.name}'`,
    function (err, results, fields) {
      console.log(results);
      console.log(fields);

      res.send(results);
      res.status(200).end();
    }
  );
  connection.end();
});

app.get('/check-connection', (req, res) => {
  res.send('Connection is OK!');
  res.status(200).end();
});

app.listen(3000);
console.log("Listening to port 3000");
