const model = require('../model');
const { RepositorioException } = require('../exceptions');

const list = (req, res, next) => {
    model.list().then(users => {
        res.json({
            success: true,
            data: users
        });
    })
    .catch(err => {
        handleError(err, res);
    })
}

const add = (req, res, next) => {
    model.add(req.body).then(item => {
        res.json({
            success: true,
            data: item
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
    if (err instanceof RepositorioException) {
        res.status(err.status).json({
            success: false,
            message: err.message
        })
    } else {
        res.status(500).json({
            success: false,
            message: 'Hubo un error al procesar la solicitud.'
        })
    }
}

module.exports = {
    list,
    add
}