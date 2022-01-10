const { Transacciones } = require('transacciones')

Transacciones({
    url: process.env.BANK_API_URL || undefined,
    cuenta: process.env.BANK_ACCOUNT || '4539218311924617'
})

module.exports = Transacciones()