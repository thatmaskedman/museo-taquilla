/**
 * Seeder script.
 *
 * A script file that seeds the default records on the project's database.
 *
 * @file    Defines and inserts the database default records.
 * @requires module:fs
 * @requires module:path
 * @author Germán Adolfo Celaya Gamboa
 */

const query = require('../query');
const path = require('path');
const fs = require('fs');

const withTestData = !!process.env.TEST;

const queriesPath = path.resolve(__dirname, './sql') + path.sep;

const generateSeeder = (command, data, name = 'table') => async () => {
    console.log(`Seeding ${name}...`)

    return await Promise
        .all(
            data.map(record => query(command, record))
        )
        .then(
            console.log(`${name} seeded!`)
        );
}

/**
 * Seed exhibitions
 */

const exhibitionQuery = fs.readFileSync(queriesPath + 'exhibition.sql', { encoding: 'utf8' });

const seedExhibitions = generateSeeder(exhibitionQuery, require('./data/exhibitions'), 'exhibitions');

/**
 * Seed carts
 */

const cartQuery = fs.readFileSync(queriesPath + 'cart.sql', { encoding: 'utf8' });

const seedCarts = generateSeeder(cartQuery, require('./data/carts'), 'carts');

/**
 * Seed cart items
 */

const itemQuery = fs.readFileSync(queriesPath + 'item.sql', { encoding: 'utf8' });

const seedItems = generateSeeder(itemQuery, require('./data/items'), 'items');

/**
 * Seed roles
 */

const roleQuery = fs.readFileSync(queriesPath + 'role.sql', { encoding: 'utf8' });

const seedRoles = generateSeeder(roleQuery, require('./data/roles'), 'roles');

/**
 * Seed users
 */

const userQuery = fs.readFileSync(queriesPath + 'user.sql', { encoding: 'utf8' });

const seedUsers = generateSeeder(userQuery, require('./data/users'), 'users');

/**
 * Seed customer types
 */

const customerTypeQuery = fs.readFileSync(queriesPath + 'customer_types.sql', { encoding: 'utf8' });

const seedCustomerTypes = generateSeeder(customerTypeQuery, require('./data/customer_types'), 'customer types');

/**
 * Seed promos
 */

const promoQuery = fs.readFileSync(queriesPath + 'promos.sql', { encoding: 'utf8' });

const seedPromos = generateSeeder(promoQuery, require('./data/promos'), 'promos');

/**
 * Call seeders
 */

const seeders = [];

seeders.push(seedRoles, seedUsers, seedCustomerTypes);

if (withTestData) {
    seeders.push(seedExhibitions, seedPromos, seedCarts, seedItems);
}

Promise
    .all(
        seeders.map(call => call())
    )
    .then(
        () => console.log('Database seeding successful.')
    )
    .catch(
        err => { throw err }
    )
    .finally( () => {
        if (require.main === module) {
            process.exit();
        }
    })