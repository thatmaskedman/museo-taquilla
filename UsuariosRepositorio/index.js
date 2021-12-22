/**
 * `UsuariosRepositorio` server script.
 *
 * A script file that starts the `UsuariosRepositorio` server.
 *
 * @file    Sets up the database table structure.
 * @requires module:dotenv
 * @requires module:path
 */

require('dotenv').config({
    path: require('path').join(__dirname, '.env')
});

require('./server').start();