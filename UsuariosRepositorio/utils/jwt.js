const jwt = require('jsonwebtoken');

const generate = id => jwt.sign(id, process.env.JWT_SECRET || 'abc123', { algorithm: 'HS256' });

module.exports = {
    generate
}