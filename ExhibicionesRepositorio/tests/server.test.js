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

describe('Update exhibition', () => {
    var exhibition = null

    beforeEach(() => {
        model.update.mockResolvedValue(undefined);
        exhibition = exhibitions[Math.floor(Math.random() * exhibitions.length)]
    })

    test('price', async () => {
        // arrange
        const data = { precio: 40 }

        model.get.mockResolvedValue({ ...exhibition, ...data })

        // act
        const res = await request.put('/' + exhibition.id)
                                .send(data)

        // assert
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual({ ...exhibition, ...data });

        expect(model.update.mock.calls[0][1]).toEqual(data)
    })

    test('and only the price', async () => {
        // arrange

        // get all data from another exhibition
        const data = exhibitions.find(e => e.id !== exhibition.id)

        model.get.mockResolvedValue({ ...exhibition, precio: data.precio })

        // act
        const res = await request.put('/' + exhibition.id)
                                .send(data)

        // assert
        expect(res.body.success).toBe(true);
        expect(res.body.data).toEqual({ ...exhibition, precio: data.precio });

        expect(model.update.mock.calls[0][1]).toEqual({ precio: data.precio })
    })
})