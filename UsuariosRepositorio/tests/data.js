const bcrypt = require('bcryptjs');

// TODO: dynamically generate fake data.

const credentials = {
    usuario: 'admin',
    password: 'admin123'
}

const users = [
    {
        id: 1,
        nombre: 'Juan',
        primer_apellido: 'López',
        segundo_apellido: 'Zúniga',
        usuario: 'admin',
        password: bcrypt.hashSync('admin123'),
        rol_id: 1
    },
    {
        id: 2,
        nombre: 'Ana',
        primer_apellido: 'Dóriga',
        segundo_apellido: 'Torres',
        usuario: 'user123',
        password: bcrypt.hashSync('password123'),
        rol_id: 2
    }
]

module.exports = {
    credentials,
    users,
};