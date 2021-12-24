// 1. Mock imports
jest.mock('../../db/conn');
jest.mock('../../db/query');

// 2. Load Test Data
const { carts, items } = require('./data');

// 3. Define Tests
const model = require('../model');
const query = require('../../db/query');

describe('Add item', () => {

    test('to existing cart', () => {
        const item = items[Math.floor(Math.random() * items.length)]

        // arrange
        query.mockResolvedValue({
            resultId: item.id
        })
    
        // act
        return model.add(item).then(resp => {
    
            // assert
            expect(resp).toEqual(item);
        });
    })
})