const handlers = require('./handlers');

class Routes {
    constructor (app) {
        this.setApp(app)
    }

    setApp(app) {
        this.app = app;
    }

    config() {
        this.app.get('/:id', handlers.get);
        this.app.post('/items', handlers.add);
    }
}

module.exports = Routes;