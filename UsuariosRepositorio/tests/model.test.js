// 1. Mock imports
jest.mock('../../db/connect');
jest.mock('../../db/query');

// 2. Load Test Data
const { credentials, users } = require('./data');

// 3. Define Tests
const model = require('../model');
const query = require('../../db/query');
const { generate } = require('../utils/jwt');

describe('User login', () => {

    test('successful', () => {
        // arrange
        query.mockResolvedValue(users.filter(u => u.usuario === credentials.usuario))
    
        // act
        return model.login(credentials.usuario, credentials.password).then(resp => {
    
            // assert
            expect(resp).toEqual(users[0]);
        });
    })
})

describe('User logout', () => {

    test('successful', () => {
        // arrange
        const user  = users[Math.floor(Math.random() * users.length)];
        const token = generate(user.id);

        query.mockImplementationOnce((...args) => {
            // assert that `token` was included within the query() call
            expect(
                args.filter(a => typeof a === 'string' && a.includes(token))
            )
            .toBeGreaterthan(0);

            return {};
        });
    
        // act
        model.login(credentials.usuario, credentials.password).then(resp => {
    
            // assert
            expect(resp).toReturn();
        });
    })
})

describe('Get blacklist status', () => {

    test('when true', () => {
        // arrange
        const user  = users[Math.floor(Math.random() * users.length)];
        const token = generate(user.id);

        query.mockResolvedValue([token])
    
        // act
        model.isBlacklisted(token).then(resp => {
    
            // assert
            expect(resp).toBeTrue();
        });
    })

    test('when false', () => {
        // arrange
        const user  = users[Math.floor(Math.random() * users.length)];
        const token = generate(user.id);

        query.mockResolvedValue([])
    
        // act
        model.isBlacklisted(token).then(resp => {
    
            // assert
            expect(resp).toBeFalse();
        });
    })
})