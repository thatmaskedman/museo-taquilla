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

test ('update price', () => {
    const exh = exhibitions[1];
    const newprice = 2.00;
    query.mockResolvedValueOnce({})
    return model.update_exh_price(exh.id,newprice).then(resp => {
        expect(resp).toBeUndefined();
    });
})