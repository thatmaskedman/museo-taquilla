const conn      = require('./conn');
const migrate   = require('./migrate');
const seed      = require('./seed');

module.exports = {
    conn,
    migrate,
    seed
}