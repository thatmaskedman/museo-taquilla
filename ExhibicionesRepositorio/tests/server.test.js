jest.mock('../../db/query');
jest.mock('../model');



const model = require('../model');
const supertest = require('supertest');
const { exhibitions } = require('./data');
var request;

beforeAll(() => {
    const server = require('../server');
    server.config();
    const app       = server.getApp();
    request         = supertest(app);
})

describe('List exhibitions', () => {

    beforeEach(() => {
        model.list.mockResolvedValue(exhibitions);
    })

    test('unfiltered', async () => {
        // act
        const res = await request.get('/');

        // assert
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual(exhibitions);

        expect(model.list.mock.calls[0][0]).toEqual(expect.not.objectContaining({ available: 'true' }))
    })

    test('available only', async () => {
        // act
        const res = await request.get('/?available=true');

        // assert
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual(exhibitions);

        expect(model.list.mock.calls[0][0]).toEqual(expect.objectContaining({ available: 'true' }))
    })
})