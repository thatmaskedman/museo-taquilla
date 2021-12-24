const express = require('express');

class Middleware {
    constructor (app) {
        this.setApp(app)
    }

    setApp(app) {
        this.app = app;
    }

    config() {
        this.app.use(express.json());
    }
}

module.exports = Middleware;