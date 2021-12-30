module.exports = {
    host: process.env.HOST || 'localhost',
    port: process.env.HEROKU ? 5000 : process.env.PORT || 5000 // override heroku port
}