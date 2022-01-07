const model = require('../model');
const { RepositorioException } = require('../exceptions');

const list = (req, res, next) => {
    const { available } = req.query

    model.list({ available }).then(data => {
        res.json({
            success: true,
            data
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
            message: 'Hubo un error al procesar la solicitud.',
            debug: err.message
        })
    }
}

const update = (req, res, next) => {
    const { precio } = req.body

    model.update(req.params.id, { precio })
    .then(() => 
        model.get(req.params.id)
    )
    .then(data => {
        res.json({
            success: true,
            data
        });
    })
    .catch(err => {
        handleError(err, res);
    })
}

const receive = (req, res, next) => {
    const data = req.body;
    model.append(data)
        .then(item => {
            res.json({
                success: true,
                data:item
            });
        })
        .catch(err => {
            handleError(err, res);
        })
}

module.exports = { list, handleError, update, receive};