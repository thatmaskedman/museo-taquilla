const { query } = require('../../db');

const SELECT = `SELECT * FROM pedidos`;
const INSERT_CART = `INSERT INTO pedidos SET ?`;
const INSERT_ITEM = `INSERT INTO detalles_pedidos SET ?`;

/**
 * Fetch a listing of the users.
 * 
 * @param {Object} params Search filters.
 * @returns {Array}
 */
const list = async (params = undefined) => {
    return await query(`${SELECT} WHERE ?`, params)
                .then(res => res)
                .catch(err => { throw err });
}

/**
 * Store a cart in database.
 * 
 * @param {Object} data Cart data.
 * @returns {Array}
 */
const store = async (data) => {
    return await query(INSERT_CART, params)
                .then(res => res)
                .catch(err => { throw err });
}

/**
 * Store a new cart item.
 * 
 * @param {Object} data New item data.
 * @returns {Number}    Inserted id.
 */
const add = async (data) => {
    return await query(INSERT_ITEM, data)
                .then(res => ({ id: res.result_id, ...data }))
                .catch(err => { throw err });
}


module.exports = {
    list,
    add
};