const model = require('../model');
const { RepositorioException } = require('../exceptions');
const { BancoAPIException } = require('transacciones')
const { getCartTotals } = require('../utils/totals');
const { printCartTickets } = require('../utils/printout');
const bank = require('../utils/bank');
const fs = require('fs');

const get = (req, res, next) => {
    model.get(req.params.id).then(cart => {
        res.json({
            success: true,
            data: cart
        });
    })
    .catch(err => {
        handleError(err, res);
    })
}

const add = (req, res, next) => {
    model.add(req.body)
    .then(id => model.getItem(id))
    .then(item => {
        res.json({
            success: true,
            data: item
        });
    })
    .catch(err => {
        handleError(err, res);
    })
}

const pay = (req, res, next) => {
    const { id } = req.params
    const { no_tarjeta, nombre_cliente, correo } = req.body

    // calculate totals
    model.getTotals(id)
    .then(items => getCartTotals(items))
    .then(totals => {
        model.update(id, { ...totals, nombre_cliente, correo })

        return totals
    })
    // process payment
    .then(({ total }) => bank.recibir(no_tarjeta, total))
    .catch(err => {
        if (err instanceof BancoAPIException) {
            const failedPaymentData = { terminacion_tarjeta: no_tarjeta.slice(-4) }

            return model.setFailedPayment(id, failedPaymentData).then(() => { throw err })
        }


        throw err
    })
    .then(({ id_Transaccion }) => {
        const paymentData = { terminacion_tarjeta: no_tarjeta.slice(-4), no_transaccion: id_Transaccion, en_efectivo: false }

        return model.setPayment(id, paymentData)        
    })
    // return updated cart info
    .then(() => model.get(id))
    .then(cart => {
        res.json({
            success: true,
            data: cart
        });
    })
    .catch(err => {
        handleError(err, res);
    })
}

const tickets = (req, res, next) => {
    model.get(req.params.id)
    .then(cart => {
        return printCartTickets(cart, cart.items)
    })
    .then(path => {
        res.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Disposition": "attachment; filename=boletos.zip"
        });
        fs.createReadStream(path).pipe(res, { end: true })
    })
    .catch(err => {
        handleError(err, res);
    })
}

const getItems = (req, res, next) => {
    model.getItems(req.params.id).then(items => {
        res.json({
            success: true,
            data: items
        });
    })
    .catch(err => {
        handleError(err, res);
    })
}

const updateItem = (req, res, next) => {
    model.updateItem(req.params.id, req.body)
    .then(() =>
        model.getItem(req.params.id)
    )
    .then(result => {
        res.json({
            success: true,
            data: result
        });
    })
    .catch(err => {
        handleError(err, res);
    })
}

/**
 * Catch-all error handler.
 * 
 * @param {Error} err The error instance.
 * @param {Object} req The request.
 * @param {Object} res The response.
 */
const handleError = (err, res) => {
    if (err instanceof RepositorioException || err instanceof BancoAPIException) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message
        })
    } else {
        res.status(500).json({
            success: false,
            message: 'Hubo un error al procesar la solicitud.',
            debug: err.message
        })
    }
}

module.exports = {
    get,
    add,
    pay,
    tickets,
    getItems,
    updateItem,
}