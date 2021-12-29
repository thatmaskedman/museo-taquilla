const { query } = require('../../db');

const SELECT = `SELECT * FROM exhibiciones`;

const list  = async () => {
    return await query(`${SELECT}`)
    .then(res => res)
    .catch(err => {throw err});
}

module.exports = { list };