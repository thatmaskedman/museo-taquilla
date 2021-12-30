require('dotenv').config({
  path: require('path').join(__dirname, '.env')
});

const mysql = require('mysql');

const config = {
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true
}

const connection = mysql.createConnection(config);

const onConnected = err => {      
  if (err) throw err;
  
  console.log("Connected!");
}

// const createConnection = () => {

//   const connection = mysql.createConnection(config);

//   handleDisconnect(connection);

//   return connection.connect(onConnected);
// }

// const handleError = (err) => {
//   if (!err.fatal) return;
  
//   if (error.code !== 'PROTOCOL_CONNECTION_LOST') {
//     throw err;
//   }

//   createConnection(connection);
// }

module.exports = () => {
  if (!connection._connectCalled) {
    connection.connect(onConnected);

    // connection.on('error', handleError);
  }

  return connection;
};