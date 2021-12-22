const Middleware = require('./middleware');
const Routes = require('./routes');
const express = require('express');

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

        const port = process.env.PORT || 4000;
        const host = process.env.HOST || 'localhost';

        this.app.listen(port, host, () => {
            console.log(`UsuariosRepositorio listening on http://${host}:${port}`)
        })
    }
}

module.exports = new Server();