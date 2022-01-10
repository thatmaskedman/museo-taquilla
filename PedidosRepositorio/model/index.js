const { query } = require('../../db');

const SELECT_CARTS = `SELECT * FROM pedidos`;
const INSERT_CART = `INSERT INTO pedidos`;
const UPDATE_CARTS = `UPDATE pedidos SET ?`;

const INSERT_PAYMENT = 'INSERT INTO pagos_de_pedidos';
const INSERT_PAYMENT_FAILURE = 'INSERT INTO transacciones_fallidas';

const SELECT_ITEMS = `SELECT * FROM detalles_pedidos`;
const INSERT_ITEM = `INSERT INTO detalles_pedidos SET ?`;
const UPDATE_ITEM = `UPDATE detalles_pedidos SET ?`;
const SELECT_CART_TOTALS = "SELECT e.precio as exh_precio, pro.porcentaje as pro_porcentaje, pro.cantidad as pro_cantidad, dp.cantidad_boletos as ped_boletos\
                                    FROM detalles_pedidos dp\
                                    INNER JOIN exhibiciones e ON dp.exhibicion_id = e.id\
                                    LEFT JOIN promociones pro ON dp.promocion_id = pro.id\
                                    WHERE dp.pedido_id = ?";

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
    // fix: mysql library tries to compare null values like `value` = null
    let where = 'WHERE ';

    where += Object.entries(params).map(([f, v]) => {
        if (v === null) {
            return `${f} IS NULL`
        } else {
            return `${f} = ${v}`
        }
    }).join(' AND ')

    return await query(`${SELECT_ITEMS} ${where} LIMIT 1`)
                .then(res => res.length ?res[0] : undefined)
                .catch(err => { throw err });
}

/**
 * Get a listing of a cart's items price, promo and ticket totals.
 * 
 * @param   {Number} id Cart id.
 * @returns {Array} Entry structure: {`exh_precio`, `pro_porcentaje`, `pro_cantidad`, `ped_boletos`}
 */
const getTotals = async (id) => {
    return await query(SELECT_CART_TOTALS, [id])
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
                .then(res => res.insertId)
                .catch(err => { throw err });
}

/**
 * Update a cart.
 * 
 * @param   {Number} id Cart id.
 * @returns {Number} The updated id.
 */
const update = async (id, data) => {
    return await query(`${UPDATE_CARTS} WHERE id = ${id}`, data)
                .then(() => id)
                .catch(err => { throw err });
}

/**
 * Store a cart's successful payment details.
 * 
 * @param   {Number} id Cart id.
 * @param   {Object} data Payment details.
 * @returns {Number}    Inserted id.
 */
const setPayment = async (id, data) => {
    const paymentId = await query(`${INSERT_PAYMENT} SET fecha = NOW(), ?`, data).then(res => res.insertId)

    await query(`${UPDATE_CARTS} WHERE id = ${id}`, { pago_de_pedido_id: paymentId })
                .then(() => paymentId)
                .catch(err => { throw err });
}

/**
 * Store a cart's failed payment details.
 * 
 * @param   {Number} id Cart id.
 * @param   {Object} data Failed payment details
 * @returns {Number}    Inserted id.
 */
const setFailedPayment = async (id, data) => {    
    return await query(`${INSERT_PAYMENT_FAILURE} SET fecha = NOW(), ?`, { pedido_id: id, ...data })
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
        ? updateItem(existing.id, { cantidad_boletos: existing.cantidad_boletos + 1 })
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
    update,
    updateItem,
    setFailedPayment,
    setPayment,
    getTotals,
    getItems,
    getItem,
};