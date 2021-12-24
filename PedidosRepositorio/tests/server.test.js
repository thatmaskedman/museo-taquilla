// 1. Mock imports
jest.mock('../../db/query');
jest.mock('../model');

// 2. Load Test Data
const { items } = require('./data');

// 3. Define Tests
const model = require('../model');
const supertest = require('supertest');

describe('Add item', () => {

    test('to existing cart', async () => {
        // arrange
        const server = require('../server');
        server.config();
        const app       = server.getApp();
        const request   = supertest(app);

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