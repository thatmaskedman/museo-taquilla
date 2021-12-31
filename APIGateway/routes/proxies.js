const httpProxy = require('express-http-proxy');

const usersServiceProxy = httpProxy(process.env.USERS_SERVICE_URL || 'localhost:4000');
const exhibitionsServiceProxy = httpProxy(process.env.EXHIBICIONES_SERVICE_URL || 'localhost:5000');
const cartsServiceProxy = httpProxy(process.env.CARTS_SERVICE_URL || 'localhost:6000');
const promocionesServiceProxy = httpProxy(process.env.PROMOCIONES_SERVICE_URL || 'localhost:7000');
module.exports = {
    users: usersServiceProxy,
    promociones: promocionesServiceProxy,
    exhibitions: exhibitionsServiceProxy,
    carts: cartsServiceProxy
}
