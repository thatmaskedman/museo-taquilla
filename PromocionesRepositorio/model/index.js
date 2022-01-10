const { query } = require('../../db');

const SELECT = `SELECT * FROM promociones`;
const INSERT = 'INSERT into promociones SET ?'

const list = async() => {
    return await query(`${SELECT} WHERE vigencia >= CURDATE()`)
    .then(res => res)
    .catch(err => {throw err});
}

const append = async (data) => {     
    return await query(INSERT, data)
        .catch(err => { throw err });
}

module.exports = {list, append};