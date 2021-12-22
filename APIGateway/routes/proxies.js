const httpProxy = require('express-http-proxy');

const usersServiceProxy = httpProxy(process.env.USERS_SERVICE_URL || 'localhost:4000');

module.exports = {
    users: usersServiceProxy
}