const handlers = require('./handlers');

class Routes {
    constructor (app) {
        this.setApp(app)
    }

    setApp(app) {
        this.app = app;
    }

    config() {
        this.app.get('/', handlers.list);
        this.app.post('/', handlers.receive)
        this.app.use((err, req, res, next) => {
            return handlers.handleError(err, res)
        });
    }
}

module.exports = Routes;