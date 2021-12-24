const handlers = require('./handlers');

class Routes {
    constructor (app) {
        this.setApp(app)
    }

    setApp(app) {
        this.app = app;
    }

    config() {
        this.app.use('/items', handlers.add);
    }
}

module.exports = Routes;