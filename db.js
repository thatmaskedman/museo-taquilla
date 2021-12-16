const mysql = require('mysql');
console.log(process.env) 

const con = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

con.connect(function(err) {
    
  if (err) throw err;
      console.log("Connected!");
}); 

module.exports = con
