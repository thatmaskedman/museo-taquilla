module.exports = {
    host: process.env.HOST || 'localhost',
    port: process.env.HEROKU ? 6000 : process.env.PORT || 6000, // override heroku port
    storage: './storage/',
    motherlode: !!process.env.DISABLE_BANK
}