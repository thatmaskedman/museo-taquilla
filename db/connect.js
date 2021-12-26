require('dotenv').config({
  path: require('path').join(__dirname, '.env')
});

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true
});

const onConnected = err => {      
  if (err) throw err;
  
  console.log("Connected!");
}

module.exports = () => connection.connect(onConnected);