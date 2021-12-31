jest.mock('../../db/connect');
jest.mock('../../db/query');

const  promos = require('./data');

const model = require('../model');
const query = require('../../db/query');


describe('listar promociones', () => {
    test('succesful', () => {
        query.mockResolvedValue(promos)
        model.list().then(resp => {
            expect(resp).toEqual(promos);
        });
    })
})
