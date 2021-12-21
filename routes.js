const { query } = require('./db');
const router = require('express').Router()

router.post('/exhibiciones', function(req, res){
    
    const sql = 'INSERT INTO `exhibiciones` set ?';

    query(sql, req.body)
        .then(() => {
            res.json({
                sucess: true,
                message: "OK"
            });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Hubo un error al insertar el exhibición.'
            });
        })
    
});

module.exports = router
