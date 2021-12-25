const express = require('express');
const cors = require('cors');

class Middleware {
    constructor (app) {
        this.setApp(app)
    }

    setApp(app) {
        this.app = app;
    }

    config() {
        this.app.use(express.json());
        this.app.use(cors());
    }
}

module.exports = Middleware;