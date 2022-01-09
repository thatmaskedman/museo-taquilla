const { query } = require('../../db');

const SELECT_CARTS = `SELECT * FROM pedidos`;
const SELECT_ITEMS = `SELECT * FROM detalles_pedidos`;
const INSERT_CART = `INSERT INTO pedidos`;
const INSERT_ITEM = `INSERT INTO detalles_pedidos SET ?`;
const UPDATE_ITEM = `UPDATE detalles_pedidos SET ?`;

/**
 * Get information of a cart.
 * 
 * @param   {Number} id Cart id.
 * @returns {Object}
 */
const get = async (id) => {
    const cart = await query(`${SELECT_CARTS} WHERE id = ? LIMIT 1`, id)
                .then(res => res[0])
                .catch(err => { throw err });

    cart.items = await getItems(id);

    return cart;
}

/**
 * Fetch a listing of a cart's items.
 * 
 * @param   {Number} id Cart id.
 * @returns {Array}
 */
const getItems = async (id) => {
    return await query(`${SELECT_ITEMS} WHERE pedido_id = ?`, id)
                .then(res => res)
                .catch(err => { throw err });
}

/**
 * Get information of a cart item.
 * 
 * @param   {Number} id Cart item id.
 * @returns {Object}
 */
const getItem = async (id) => {
    return await query(`${SELECT_ITEMS} WHERE id = ? LIMIT 1`, id)
                .then(res => res[0])
                .catch(err => { throw err });
}

/**
 * Get the first cart item that matches a search.
 * 
 * @param   {Object} params Cart item search fields.
 * @returns {Object}
 */
const searchItem = async (params) => {
    return await query(`${SELECT_ITEMS} WHERE ? LIMIT 1`, params)
                .then(res => res.length ?res[0] : undefined)
                .catch(err => { throw err });
}

/**
 * Store a cart in database.
 * 
 * @returns {Number}    Inserted id.
 */
const store = async () => {
    return await query(`${INSERT_CART} VALUES ()`)
                .then(res => res.insertId)
                .catch(err => { throw err });
}

/**
 * Create or update a cart item.
 * 
 * @param {Object} data New item data.
 * @returns {Number}    New or updated item id.
 */
const add = async (data) => {
    if (data.pedido_id === undefined) {
        data.pedido_id = await store();
    }

    const existing = await searchItem({ pedido_id, exhibicion_id, promocion_id } = data)

    return await existing 
        ? updateItem(existing.id, { ...existing, id: undefined })
        : createItem(data)
}

/**
 * Create a cart item.
 * 
 * @param {Object} data New item data.
 * @returns {Number} New item id.
 */
const createItem = async (data) => {
    return await query(INSERT_ITEM, data)
                .then(res => res.insertId)
                .catch(err => { throw err });
}

/**
 * Update a cart item.
 * 
 * @param {Object} data New item data.
 * @returns {Number} The updated id.
 */
const updateItem = async (id, data) => {
    return await query(`${UPDATE_ITEM} WHERE id = ${id}`, data)
                .then(() => id)
                .catch(err => { throw err });
}


module.exports = {
    get,
    add,
    updateItem,
    getItem
};