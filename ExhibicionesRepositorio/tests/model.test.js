jest.mock('../../db/connect');
jest.mock('../../db/query');



const model = require('../model');
const query = require('../../db/query');


describe('listar exhibiciones', () => {
    test('succesful', () => {
        const exh = [{
            id: 1,
            nombre: 'mona lisa',
            descripcion: 'pintura de italia',
            desde: '2021-11-05',
            hasta: '2021-12-29',
            precio: '0.00'
        }, {
            id: 2,
            nombre: 'american gothic',
            descripcion: 'pintura de kansas',
            desde: '2021-11-05',
            hasta: '2021-12-29',
            precio: '0.00'
        }];
        query.mockResolvedValue(exh)
        model.list().then(resp => {
            expect(resp).toEqual(exh);
        });
    })
})

