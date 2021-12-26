// 1. Mock imports
jest.mock('../../db/query');
jest.mock('../model');

// 2. Load Test Data
const { carts, items } = require('./data');

// 3. Define Tests
const model = require('../model');
const supertest = require('supertest');
var request;

beforeAll(() => {
    const server = require('../server');
    server.config();
    const app       = server.getApp();
    request         = supertest(app);
})

describe('Add item', () => {

    test('to existing cart', async () => {
        // arrange
        const item = items[Math.floor(Math.random() * items.length)]

        model.add.mockResolvedValue(item);

        // act
        const res = await request.post('/items')
            .send({id: undefined, ...item});

        // assert
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual(item);
    })
})

test('Get cart info', async () => {
    // arrange
    const cart = carts[Math.floor(Math.random() * carts.length)];
    cart.items = items.filter(i => i.pedido_id === cart.id);

    model.get.mockResolvedValue(cart);

    // act
    const res = await request.get('/' + cart.id);

    // assert
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(cart);
})