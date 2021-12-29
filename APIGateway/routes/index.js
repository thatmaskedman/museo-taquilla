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
        this.app.use('/exhibiciones', proxies.exhibiciones);
    }
}

module.exports = Routes;