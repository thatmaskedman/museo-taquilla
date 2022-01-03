const { query } = require('../../db');

const SELECT = `SELECT * FROM exhibiciones`;
const UPDATE = `UPDATE exhibiciones `;

/**
 * Get a listing of the exhibitions.
 * 
 * @param   {Object} params.available Wether to filter out exhibitions unavailable to the public.
 * @returns {Array}
 */
const list  = async ({ available = false }) => {
    var sql = SELECT

    if (available) {
        sql += ' WHERE DATE(hasta) >= CURDATE() AND `precio` IS NOT NULL'
    }

    return await query(sql)
                .then(res => res)
                .catch(err => {throw err});
}

/**
 * Get information of an exhibition.
 * 
 * @param   {Number} id Exhibition id
 * @returns {void}
 */
const get = async (id) => {
    await query(`${SELECT} WHERE id = ${id} LIMIT 1`)
                .then(res => res)
                .catch(err => { throw err });
}

/**
 * Update an exhibition.
 * 
 * @param   {Number} id Exhibition id
 * @param   {Object} data New data.
 * @returns {void}
 */
const update = async (id, data) => {
    await query(`${UPDATE} SET ? WHERE id = ${id}`, data)
                .catch(err => { throw err });
}

module.exports = { list, update, get };