module.exports = {
    host: process.env.HOST || 'localhost',
    port: process.env.HEROKU ? 4000 : process.env.PORT || 4000 // override heroku port
}