class RepositorioException extends Error {
    status = 0;

    constructor(status, message = '') {
        super(message);

        this.status = status;
    }
}

module.exports = RepositorioException;