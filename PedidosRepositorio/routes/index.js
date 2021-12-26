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
        this.app.put('/items/:id', handlers.updateItem);
    }
}

module.exports = Routes;