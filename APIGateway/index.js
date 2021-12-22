/**
 * `APIGateway` server script.
 *
 * A script file that starts the `APIGateway` server.
 *
 * @file    Starts the APiGateway server.
 * @requires module:dotenv
 * @requires module:path
 */

require('dotenv').config({
    path: require('path').join(__dirname, '.env')
});

require('./server').start();