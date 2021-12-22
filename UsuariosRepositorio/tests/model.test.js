// 1. Mock imports
jest.mock('../../db/conn');
jest.mock('../../db/query');

// 2. Load Test Data
const { credentials, users } = require('./data');

// 3. Define Tests
const model = require('../model');
const query = require('../../db/query');

describe('User login', () => {

    test('successful', () => {
        // arrange
        query.mockResolvedValue(users.filter(u => u.usuario === credentials.usuario))
    
        // act
        model.login(credentials.usuario, credentials.password).then(resp => {
    
            // assert
            expect(resp.success).toBe(true);
            expect(resp.data).toEqual(users[0]);
        });
    })
})