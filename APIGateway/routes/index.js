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
        this.app.use('/exhibitions', proxies.exhibitions);
        this.app.use('/carts', proxies.carts);
        this.app.use('/promociones', proxies.promociones);
    }
}

module.exports = Routes;