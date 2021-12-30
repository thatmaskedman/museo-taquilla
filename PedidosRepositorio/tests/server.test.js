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

    test('to new cart', async () => {
        // arrange
        const item = items[Math.floor(Math.random() * items.length)]

        delete item.pedido_id;
        
        const new_cart_id = Math.ceil(Math.random() * 10)

        model.add.mockResolvedValue({ ...item, pedido_id: new_cart_id });

        // act
        const res = await request.post('/items')
            .send({id: undefined, pedido_id: undefined, ...item});

        // assert
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual({ ...item, pedido_id: new_cart_id });
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

test('Update cart item', async () => {
    // arrange
    const item = items[Math.floor(Math.random() * items.length)];

    const data = { cantidad_boletos: Math.random() * 10 }

    model.updateItem.mockResolvedValue({});

    model.getItem.mockResolvedValue({ ...item, ...data });

    // act
    const res = await request.put('/items/' + item.id);

    // assert
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual({ ...item, ...data });
})