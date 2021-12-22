// 1. Mock imports
jest.mock('../../db/query');
jest.mock('../model');

// 2. Load Test Data
const { credentials, users } = require('./data');

// 3. Define Tests
const model = require('../model');
const supertest = require('supertest');
const { AuthenticationException } = require('../exceptions');

describe('User login', () => {

    test('successful', async () => {
        // arrange
        const server = require('../server');
        server.config();
        const app       = server.getApp();
        const request   = supertest(app);

        model.login.mockResolvedValue(users[0]);

        // act
        const res = await request.post('/login')
            .send(credentials);

        // assert
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeTruthy();
        expect(res.body.user).toEqual(users[0]);
    })

    test('unsuccessful', async () => {
        // arrange
        const server = require('../server');
        server.config();
        const app       = server.getApp();
        const request   = supertest(app);

        model.login.mockImplementation(() => {
            throw new AuthenticationException;
        });

        // act
        const res = await request.post('/login')
            .send({ ...credentials, password: 'badpassword' });

        // assert
        expect(res.statusCode).toBe(401);

        expect(res.body.token).toBeUndefined();
        expect(res.body.user).toBeUndefined();
    })
})