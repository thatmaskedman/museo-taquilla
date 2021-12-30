/**
 * `PedidosRepositorio` server script.
 *
 * A script file that starts the `PedidosRepositorio` server.
 *
 * @file    Starts the PedidosRepositorio server.
 * @requires module:dotenv
 * @requires module:path
 */

require('dotenv').config({
    path: require('path').join(__dirname, '.env')
});

require('./server').start();