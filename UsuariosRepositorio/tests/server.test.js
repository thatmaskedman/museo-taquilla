// 1. Mock imports
jest.mock('../../db/query');
jest.mock('../model');

// 2. Load Test Data
const { credentials, users } = require('./data');

// 3. Define Tests
const model = require('../model');
const supertest = require('supertest');
const { generate, protect, decode } = require('../utils/jwt')
const { AuthenticationException } = require('../exceptions');
var request, app;

beforeAll(() => {
    const server    = require('../server');
    server.config();
    app         = server.getApp();
    request     = supertest(app);
})

describe('User login', () => {

    test('successful', async () => {
        // arrange
        const user = users[Math.floor(Math.random() * users.length)];
        model.login.mockResolvedValue(user);

        // act
        const res = await request.post('/login')
            .send(credentials);

        // assert
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeTruthy();
        expect(res.body.user).toEqual(user);
    })

    test('unsuccessful', async () => {
        // arrange
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

describe('User logout', () => {
    var user, token, claims;

    beforeEach(() => {
        // arrange
        user  = users[Math.floor(Math.random() * users.length)];
        token = generate(user.id);
        claims = decode(token);
    
        model.logout.mockImplementationOnce(async t => {
            // assert that the token `claims` was passed to the model.logout() call
            expect(t).toEqual(claims);
    
            return {};
        });
    })

    test('successful', async () => {
        // arrange
        model.isBlacklisted.mockResolvedValue(false)

        // act
        const res = await request
            .delete('/logout')
            .set("Authorization", `Bearer ${token}`);
    
        // assert
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    })

    test('denies protected routes', async () => { 
        // arrange
        const PROTECTED_ROUTE = '/protected-route';

        app.get(PROTECTED_ROUTE, protect(), (req, res) => res.json({ success: true }));
        request = supertest(app)

        model.isBlacklisted.mockResolvedValue(true)
        
        // act
        const res = await request.get(PROTECTED_ROUTE)
            .set("Authorization", `Bearer ${token}`);
    
        // assert
        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBeUndefined();
        expect(model.isBlacklisted).toHaveBeenCalledWith(claims);
    })
})