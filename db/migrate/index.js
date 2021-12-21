/**
 * Database migration script.
 *
 * A script file that sets up the table structure on the project's database.
 *
 * @file    Sets up the database table structure.
 * @requires module:fs
 * @requires module:path
 * @author Germán Adolfo Celaya Gamboa
 */

const fs = require('fs');
const path = require('path');
const query = require('../query');

const schemaQuery = fs.readFileSync(path.resolve(__dirname, './sql/schema.sql'), { encoding: 'utf8' });

console.log('Migrating database...');
query(schemaQuery)
    .then(() =>
        console.log('Migration successful.')
    )
    .catch(err => {
        throw err
    })
    .finally(() => {
        if (require.main === module) {
            process.exit();
        }
    })