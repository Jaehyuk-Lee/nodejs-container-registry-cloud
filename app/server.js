const express = require('express');
const app = express();
const mysql = require('mysql2');
const config = require('./config/config.js');

const connection_info = {
  host: config.DB_IP,
  user: config.USER_NAME,
  password: config.USER_PASSWORD,
  database: config.DATABASE_NAME
};

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers',
    'Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization');
  next();
});

app.get('/search', (req, res) => {
  const PARAM = JSON.parse(req.query.param).params;
  console.log(PARAM.name);

  const connection = mysql.createConnection(connection_info);
  connection.query(
    `SELECT * FROM ${config.TABLE_NAME} WHERE Name = '${PARAM.name}'`,
    function (err, results, fields) {
      console.log(results);
      console.log(fields);

      res.send(results);
      res.status(200).end();
    }
  );
  connection.end();
});

app.get('/searchUserID', (req, res) => {
  const PARAM = JSON.parse(req.query.param).params;
  console.log(PARAM.userID);

  const connection = mysql.createConnection(connection_info);
  connection.query(
    `SELECT * FROM ${config.TABLE_NAME} WHERE UserID = '${PARAM.userID}'`,
    function (err, results, fields) {
      console.log(results);
      console.log(fields);

      res.send(results);
      res.status(200).end();
    }
  );
  connection.end();
});

app.get('/update', (req, res) => {
  const PARAM = JSON.parse(req.query.param).params;

  const connection = mysql.createConnection(connection_info);
  connection.query(
    `UPDATE ${config.TABLE_NAME} SET
    Name = '${PARAM.name}',
    ResidentRegistrationNumber = '${PARAM.residentRegistrationNumber}',
    ContactNumber = '${PARAM.contactNumber}',
    Address = '${PARAM.address}',
    Email = '${PARAM.email}'
    WHERE UserID = '${PARAM.userID}'`,
    function (err, results, fields) {
      console.log(results);
      results.type = 'update';

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
