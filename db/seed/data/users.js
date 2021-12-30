const bcrypt = require('bcryptjs');
const defaultPassword = bcrypt.hashSync('admin');

module.exports = [{
    nombre: 'John',
    primer_apellido: 'Doe',
    segundo_apellido: 'Rodríguez',
    usuario: 'encargado',
    password: defaultPassword,
    rol_id: 1 // Encargado de Taquilla
}, {
    nombre: 'Jane',
    primer_apellido: 'Doe',
    segundo_apellido: 'Ballesteros',
    usuario: 'admin',
    password: defaultPassword,
    rol_id: 2 // Administrador de Taquilla
}]