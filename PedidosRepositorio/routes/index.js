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
        this.app.get('/:id/items', handlers.getItems);
        this.app.put('/:id/pay', handlers.pay);
        this.app.get('/:id/downloads/tickets', handlers.tickets);
        this.app.post('/items', handlers.add);
        this.app.put('/items/:id', handlers.updateItem);
    }
}

module.exports = Routes;