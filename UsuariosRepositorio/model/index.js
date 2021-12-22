const { query } = require('../../db');
const bcrypt    = require('bcryptjs');
const { AuthenticationException } = require('../exceptions');

const SELECT = `SELECT * FROM usuarios`;

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


module.exports = {
    list,
    login
};