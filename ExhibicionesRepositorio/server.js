const Middleware = require('./middleware');
const Routes = require('./routes');
const express = require('express');
const config = require('./config');

class Server {
    constructor() {
        require('express-async-errors');
        this.setApp( express() );
    }

    setApp(app) {
        this.app = app;
    }

    getApp() {
        return this.app
    }

    config() {
        new Middleware(this.app).config();

        new Routes(this.app).config();
    }

    start() {
        this.config();

        const port = config.port;
        const host = config.host;

        this.app.listen(port, host, () => {
            console.log(`ExhibicionesRepositorio listening on http://${host}:${port}`)
        })
    }
}

module.exports = new Server();