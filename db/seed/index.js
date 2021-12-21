/**
 * Seeder script.
 *
 * A script file that seeds the default records on the project's database.
 *
 * @file    Defines and inserts the database default records.
 * @requires module:fs
 * @requires module:path
 * @requires module:bcryptjs
 * @author Germán Adolfo Celaya Gamboa
 */

const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { query } = require('../utils');

const queriesPath = path.resolve(__dirname, './sql') + path.sep;

/**
 * Seed roles
 */

const roleQuery = fs.readFileSync(queriesPath + 'role.sql', { encoding: 'utf8' });

const roles = ['Encargado de Taquilla', 'Administrador de Taquilla'];

console.log('Seeding roles...')

Promise
    .all(
        roles.map(name => query(roleQuery, [name]))
    )
    .then(() => {
        console.log('Roles seeded!')
    })
    .catch(err => {
        throw err
    })

/**
 * Seed users
 */

const userQuery = fs.readFileSync(queriesPath + 'user.sql', { encoding: 'utf8' });
const defaultPassword = bcrypt.hashSync('admin');

const users = [{
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
}];

console.log('Seeding users...')

Promise
    .all(
        users.map(user => query(userQuery, user))
    )
    .then(() => {    
        console.log('Users seeded!');

        console.log('Database seeding successful.');
    })
    .catch(err => {
        throw err
    })
    .finally(() => {
        if (require.main === module) {
            process.exit();
        }
    })