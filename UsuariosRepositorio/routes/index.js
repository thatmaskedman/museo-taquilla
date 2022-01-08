const handlers = require('./handlers');
const { protect } = require('../utils/jwt');

class Routes {
    constructor (app) {
        this.setApp(app)
    }

    setApp(app) {
        this.app = app;
    }

    config() {
        this.app.post('/login', handlers.login);
        this.app.delete('/logout', protect(), handlers.logout);

        this.app.use((err, req, res, next) => {
            return handlers.handleError(err, res)
        });
    }
}

module.exports = Routes;