const jwt = require('jsonwebtoken');
const { v4 : uuid } = require('uuid');
const protector = require('express-jwt');
const { isBlacklisted } = require('../model');

const secret = process.env.JWT_SECRET || 'abc123';

const isRevoked = (req, claims, done) => isBlacklisted(claims).then(blacklisted => done(null, blacklisted)).catch(err => done(err));

const generate = id => jwt.sign({ sub: id, jti: uuid(), iat: Date.now() }, secret, { algorithm: 'HS256' });

const decode = token => jwt.verify(token, secret, { algorithm: 'HS256' });

const protect = () => protector({ secret, algorithms: ['HS256'], isRevoked });

module.exports = {
    generate,
    decode,
    protect
}