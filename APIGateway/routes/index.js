const proxies = require('./proxies');

class Routes {
    constructor (app) {
        this.setApp(app);
    }

    setApp(app) {
        this.app = app;
    }

    config() {
        this.app.use('/users', proxies.users);
    }
}

module.exports = Routes;