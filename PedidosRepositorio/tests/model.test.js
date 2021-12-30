// 1. Mock imports
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

    test('to new cart', async () => {

        // arrange
        const item = items[Math.floor(Math.random() * items.length)]

        delete item.pedido_id;
        
        const new_cart_id = Math.ceil(Math.random() * 10)

        // mock query inside store() method
        query.mockResolvedValueOnce({
            resultId: new_cart_id
        })
        // mock query inside add() method
        .mockResolvedValueOnce({
            resultId: item.id
        });
    
        // act
        return await model.add(item).then(resp => {
    
            // assert
            expect(resp).toEqual({ ...item, pedido_id: new_cart_id });
        });
    })
})

test('Get cart info', () => {
    
    // arrange
    const cart = carts[Math.floor(Math.random() * carts.length)];
    cart.items = items.filter(i => i.pedido_id === cart.id);

    // mock query inside get() method
    query.mockResolvedValueOnce({
        ...cart, items: undefined
    })
    // mock query inside getItems() method
    .mockResolvedValueOnce([
        ...cart.items
    ]);

    // act
    return model.get(cart.id).then(resp => {

        // assert
        expect(resp).toEqual(cart);
    });
})

test('Update cart item', () => {
    
    // arrange
    const item = items[Math.floor(Math.random() * items.length)];

    const data = { cantidad_boletos: Math.random() * 10 }

    // mock query inside updateItem() method
    query.mockResolvedValueOnce({})

    // act
    return model.updateItem(item.id, data).then(resp => {

        // assert
        expect(resp).toBeUndefined();
    });
})

test('Get cart item', () => {
    
    // arrange
    const item = items[Math.floor(Math.random() * items.length)];

    query.mockResolvedValueOnce(item)

    // act
    return model.getItem(item.id).then(resp => {

        // assert
        expect(resp).toEqual(item);
    });
})