jest.mock('../../db/connect');
jest.mock('../../db/query');



const model = require('../model');
const query = require('../../db/query');
const { exhibitions } = require('./data');


describe('List exhibitions', () => {
    beforeEach(() => {
        query.mockResolvedValue(exhibitions)
    })

    test('unfiltered', () => {

        model.list().then(resp => {
            expect(resp).toEqual(exhibitions);
            
            expect(query.mock.calls[0][0]).toEqual(expect.not.stringContaining('CURDATE()'))
        });

    })
    
    test('available only', () => {

        model.list({ available: true }).then(resp => {
            expect(resp).toEqual(exhibitions);

            expect(query.mock.calls[0][0]).toEqual(expect.stringContaining('CURDATE()'))
        });
    })

})

test('Update exhibition', () => {
    // arrange
    exhibition = exhibitions[Math.floor(Math.random() * exhibitions.length)]

    const data = { precio: 40 }

    query.mockResolvedValue({})

    // act
    model.update(exhibition.id, data).then(resp => {
        
        // assert
        expect(resp).toBeUndefined();
        
        expect(query.mock.calls[0][1]).toEqual(data)
    });

})