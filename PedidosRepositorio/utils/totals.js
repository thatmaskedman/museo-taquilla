const getCartTotals = (items = []) => {
    let subtotal = 0, total = 0;

    for (const { exh_precio, pro_porcentaje, pro_cantidad, ped_boletos } of items) {
        subtotal    += ped_boletos * exh_precio        
        if (pro_porcentaje === null) {
            total   += ped_boletos * exh_precio
        } else {
            total   += (ped_boletos / pro_cantidad) * (exh_precio / pro_porcentaje)
        }
    }

    return { subtotal, total }
}

module.exports = {
    getCartTotals
}