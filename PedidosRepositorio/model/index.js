const { query } = require('../../db');

const SELECT = `SELECT * FROM pedidos`;
const INSERT_CART = `INSERT INTO pedidos`;
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
 * @returns {Number}    Inserted id.
 */
const store = async () => {
    return await query(`${INSERT_CART} VALUES ()`)
                .then(res => res.resultId)
                .catch(err => { throw err });
}

/**
 * Store a new cart item.
 * 
 * @param {Object} data New item data.
 * @returns {Number}    New item id.
 */
const add = async (data) => {
    if (data.pedido_id === undefined) {
        data.pedido_id = await store();
    }

    return await query(INSERT_ITEM, data)
                .then(res => ({ id: res.resultId, ...data }))
                .catch(err => { throw err });
}


module.exports = {
    list,
    add
};