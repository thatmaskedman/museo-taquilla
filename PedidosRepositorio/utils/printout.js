const ToPDF = require('./htmlToPdf')
const path = require('path');
const fs = require('fs');
const moment = require('moment')
const archiver = require('archiver');
const qrGenerator = require('qrcode-generator')

const ticketTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'ticket.html'), { encoding: 'utf-8' })
const STORAGE_FOLDER = path.join(__dirname, '..', require('../config').storage)

/**
 * @returns {Promise<string>} The zipped tickets location.
 */
const printCartTickets = async (cart, items) => {
    const folder = path.join(STORAGE_FOLDER, `${cart.id}`)

    if (fs.existsSync(folder)) {
        return await archiveCartTickets(cart)
    };
    
    fs.mkdirSync(folder, { recursive: true }, () => resolve(false))

    for (const item of items) {

        for (let i = 0; i < item.cantidad_boletos; i++) {
            const ticketId = `${item.id}-${i}`;

            const file = path.join(STORAGE_FOLDER, `${cart.id}`, `${ticketId}.pdf`)

            const vars = {
                exhibition: item.exh_nombre,
                start: moment(item.exh_desde).format('YYYY-MM-DD'),
                end: moment(item.exh_hasta).format('YYYY-MM-DD'),
                place: 'Museo MUAFS',
                id: ticketId,
                buyer: cart.nombre_cliente,
                qr: getQR(ticketId, cart)
            }
            
            await ToPDF.convert(ticketTemplate, vars, file)
        }
    }

    return await archiveCartTickets(cart)
}

const getQR = (ticketId, cart) => {
    const qr = qrGenerator(4, 'L')
    
    qr.addData(`${ticketId}-${cart.nombre_cliente}`)
    qr.make()

    return qr.createSvgTag()
}

/**
 * @returns {Promise<string>} The new ZIP path.
 */
const archiveCartTickets = async (cart) => {
    const tickets = path.join(STORAGE_FOLDER, `${cart.id}/`)
    const file = path.join(STORAGE_FOLDER, `${cart.id}.zip`)
    const to = fs.createWriteStream(file)

    const archive = archiver('zip', {
        zlib: { level: 9 }
    } )

    archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
            console.log(`WARNING WHEN ARCHIVING ${err.code}:`, err)
        } else {
            console.log(`EROOR WHEN ARCHIVING ${err.code}:`)
            throw err;
        }
    });
    
    archive.on('error', function(err) {
        console.log(`EROOR WHEN ARCHIVING ${err.code}:`)
        throw err;
    });

    const action = new Promise((resolve, reject) => {
        archive.on('end', () => resolve(file))
        archive.on('error', err => reject(err))

        archive.pipe(to);

        archive.directory(tickets, false);

        archive.finalize();
    })

    return await action
}

module.exports = {
    printCartTickets
}