/**
 * `UsuariosRepositorio` server script.
 *
 * A script file that starts the `UsuariosRepositorio` server.
 *
 * @file    Starts the UsuariosRepositorio server.
 * @requires module:dotenv
 * @requires module:path
 */

require('dotenv').config({
    path: require('path').join(__dirname, '.env')
});

require('./server').start();