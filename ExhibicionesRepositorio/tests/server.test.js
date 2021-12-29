jest.mock('../../db/query');
jest.mock('../model');



const model = require('../model');
const supertest = require('supertest');
const NotFoundException = require('../exceptions/NotFoundException');
var request;

beforeAll(() => {
    const server = require('../server');
    server.config();
    const app       = server.getApp();
    request         = supertest(app);
})

test ('listar exhibiciones', async () => {
    const exh =  [{
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
    model.list.mockResolvedValue(exh);
    const res = await request.get('/');
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(exh);
})





