const { query } = require('../../db');

const SELECT = `SELECT * FROM exhibiciones`;
const UPDATE_PRICE = `UPDATE exhibiciones `;

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
 * update price
 * @id {int} id de la exhibicion que se quiere cambiar
 * @newprice {float} el nuevo precio para la exhibicion
 * @returns {void}
 */
const update_exh_price = async (id, newprice) => {
    await query(`${UPDATE_PRICE} SET precio = ${newprice} WHERE id = ${id}`)
                .catch(err => { throw err });
}

module.exports = { list, update_exh_price };