const { Transacciones } = require('transacciones')
const { motherlode } = require('../config')

Transacciones({
    url: process.env.BANK_API_URL || undefined,
    cuenta: process.env.BANK_ACCOUNT || '4539218311924617'
})

if (motherlode)
    module.exports = {
        recibir: async () => {
            const mock = new Promise((res) => {
                console.log('waiting for bank response...')
                setTimeout(() => res({ id_Transaccion: null }), 2000)
            })

            return await mock
        }
    }
else
    module.exports = Transacciones()