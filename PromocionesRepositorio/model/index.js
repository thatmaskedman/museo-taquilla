const { query } = require('../../db');

const SELECT = `SELECT * FROM promociones`;

const list = async() => {
    return await query(`${SELECT} WHERE vigencia >= CURDATE()`)
    .then(res => res)
    .catch(err => {throw err});
}

module.exports = {list};