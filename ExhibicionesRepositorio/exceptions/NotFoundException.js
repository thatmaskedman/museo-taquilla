const RepositorioException = require("./RepositorioException");

class NotFoundException extends RepositorioException {
    constructor(message = 'Registro no encontrado.') {
        
        super(401, message);
    }
}

module.exports = NotFoundException;