const RepositorioException = require("./RepositorioException");

class AuthenticationException extends RepositorioException {
    constructor(message = 'Las credenciales no coinciden.') {
        
        super(401, message);
    }
}

module.exports = AuthenticationException;