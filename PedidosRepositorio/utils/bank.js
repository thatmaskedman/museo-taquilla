const { Transacciones } = require('transacciones')
const { motherlode } = require('../config')

Transacciones({
    url: process.env.BANK_API_URL || undefined,
    cuenta: process.env.BANK_ACCOUNT || '4539218311924617'
})

if (motherlode)
    module.exports = { recibir: () => ({ id_Transaccion : null }) }
else
    module.exports = Transacciones()