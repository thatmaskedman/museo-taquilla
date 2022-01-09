module.exports = {
    host: process.env.HOST || 'localhost',
    port: process.env.HEROKU ? 7000 : process.env.PORT || 7000 // override heroku port
}