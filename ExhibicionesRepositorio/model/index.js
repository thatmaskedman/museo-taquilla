const { query } = require('../../db');

const SELECT = `SELECT * FROM exhibiciones`;

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

module.exports = { list };