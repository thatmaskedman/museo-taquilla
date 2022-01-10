const model = require('../model');
const { RepositorioException } = require('../exceptions');

const list = (req,res,next) => {
    model.list().then(promociones => {
        res.json({
            success:true,
            data:promociones
        });
    })
    .catch(err => {
        handleError(err,res);
    })
}

const handleError = (err,res) => {
    if (err instanceof RepositorioException){
        res.status(err.status).json({
            success:false,
            message: err.message
        })
    }else{
        res.status(500).json({
            success:false,
            message: 'Hubo un error al procesar la solicitud.',
            message2: err.message 
        })
    }
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

module.exports = {list, handleError, receive};