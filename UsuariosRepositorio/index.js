/**
 * `UsuariosRepositorio` server script.
 *
 * A script file that starts the `UsuariosRepositorio` server.
 *
 * @file    Sets up the database table structure.
 * @requires module:dotenv
 */

require('dotenv').config();

require('./server').start();