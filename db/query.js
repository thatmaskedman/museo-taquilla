const connect = require('./connect');

/**
 * **Promise** of a DB query.
 *
 * A generic **mysql** connection `query()` call wrapped in a **Promise**.
 *
 * @param   {String} sql The SQL query.
 * @param   {any} values Values to embed into the query.
 * @returns {Promise}
 */
const query = (sql, values = undefined) => (
    new Promise((resolve, reject) => (
        connect().query(sql, values, (err, result) => {
            if (err) reject(err);
            
            else resolve(result);
        })
    ))
)

module.exports = query;