require('dotenv').config()
const mysql = require('mysql');

const conn = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true
});

conn.connect(function(err) {
    
  if (err) throw err;
      console.log("Connected!");
}); 

module.exports = conn
