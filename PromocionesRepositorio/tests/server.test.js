// 1. Mock imports
jest.mock('../../db/query');
jest.mock('../model');

const promos = require('./data');

// 3. Define Tests
const model = require('../model');
const supertest = require('supertest');
var request, app;

beforeAll(() => {
    const server = require('../server');
    server.config();
    const app       = server.getApp();
    request         = supertest(app);
})

test ('listar promociones vigentes', async () => {
    model.list.mockResolvedValue(promos);
    const res = await request.get('/');
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(promos);
})

