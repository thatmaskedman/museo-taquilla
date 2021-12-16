const conn = require('./db')
const router = require('express').Router()

router.post('/exhibiciones', function(req, res){
    const {id, nombre, descripcion, desde, hasta} = req.body;
    console.log(req.body);
    const sql = 'INSERT INTO `exhibiciones` set ?';

    conn.query(sql, function (err, result){
        if(err){
            res.status(500).json({
                success: false,
                message: 'Hubo un error al insertar el exhibición.'
            })
        }

        res.json({sucess: true, message: "OK"});

        });
    }
);

module.exports = router
