const { query } = require('../../db');
const bcrypt    = require('bcryptjs');
const { AuthenticationException } = require('../exceptions');

const SELECT = `SELECT * FROM usuarios`;
const INSERT_BLACKLIST = `INSERT INTO blacklisted_tokens SET ?`;
const SELECT_BLACKLIST = `SELECT * FROM blacklisted_tokens`;

/**
 * Fetch a listing of the users.
 * 
 * @param {Object} params Search filters.
 * @returns {Array}
 */
const list = async (params = undefined) => {
    return await query(`${SELECT} WHERE ?`, params)
                .then(res => res)
                .catch(err => { throw err });
}


/**
 * Fetch user based on their credentials.
 * 
 * @param {String} username Account username.
 * @param {String} password Plain-text password.
 * @returns {Object}        The matched user.
 * @throws  {AuthenticationException} When the credentials don't match.
 */
const login = async (username, password) => {
    const [ account ] = await query(`${SELECT} WHERE usuario = ? LIMIT 1`, username);

    if (!account) {
        throw new AuthenticationException;
    }

    if (bcrypt.compareSync(password, account.password) === false) {
        throw new AuthenticationException;
    }

    return account;
}


/**
 * Blacklist an authentication token.
 * 
 * @param {String} payload JWT token payload.
 * @returns {void}
 */
const logout = async (payload) => {
    await query(INSERT_BLACKLIST, payload)
                .catch(err => { throw err });
}


/**
 * Wether a token is blacklisted.
 * 
 * @param {String} payload JWT token payload.
 * @returns {Boolean}
 */
const isBlacklisted = async ({ jti }) => {
    return await query(`${SELECT_BLACKLIST} WHERE ? LIMIT 1`, { jti })
                .then(res => !!res?.length)
                .catch(err => {
                    console.log(err);
                    return false; 
                });
}


module.exports = {
    list,
    login,
    logout,
    isBlacklisted
};