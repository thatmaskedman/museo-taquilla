const { conn } = require('./db')
const router = require('express').Router()

router.post('/exhibiciones', function(req, res){
    // try{
        const sql = 'INSERT INTO `exhibiciones` set ?';
        console.log(req.body); 
        conn.query(sql, req.body,function (err, result){
            if (err) {
                res.status(500).json({
                    success: false,
                    message: 'Hubo un error al insertar el exhibición.'
                });
            } else {
                res.json({sucess: true, message: "OK"});
            }
        });
    
    // } catch (e){
    //     res.status(500).json({
    //         success: false,
    //         message: 'Hubo un error al insertar el exhibición.'
    //     });
    // }
});

module.exports = router
