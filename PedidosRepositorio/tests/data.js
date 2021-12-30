// TODO: dynamically generate fake data.

const carts = [
    {
        id: 1,
        pago_de_pedido_id: null,
        nombre_cliente: null,
        correo: null,
        subtotal: 0.00,
        total: 0.00
    },
    {
        id: 2,
        pago_de_pedido_id: null,
        nombre_cliente: null,
        correo: null,
        subtotal: 0.00,
        total: 0.00
    }
]

const items = [
    {
        id: 1,
        pedido_id: 1,
        exhibicion_id: 1,
        promocion_id: null,
        cantidad_boletos: 4
    },
    {
        id: 2,
        pedido_id: 1,
        exhibicion_id: 2,
        promocion_id: null,
        cantidad_boletos: 2
    },

    {
        id: 3,
        pedido_id: 2,
        exhibicion_id: 1,
        promocion_id: null,
        cantidad_boletos: 6
    },
]

module.exports = {
    carts,
    items,
};