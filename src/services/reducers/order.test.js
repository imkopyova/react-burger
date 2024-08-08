import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    CLEAR_ORDER_DATA,
} from '../actions/order';
import { initialOrderState, orderReducer } from './order';

const ingredientsMock = [
    {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
    },
    {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
    },
];

describe('order reducer', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockReturnValue({
            json: jest.fn().mockResolvedValue({
                success: true,
                name: 'Space флюоресцентный био-марсианский бургер',
                ingredients: ingredientsMock,
            }),
            ok: true,
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should return the initial state', () => {
        const state = orderReducer(initialOrderState, { type: '' });
        expect(state).toEqual(initialOrderState);
    });
    it('should handle POST_ORDER_REQUEST', () => {
        expect(
            orderReducer(initialOrderState, {
                type: POST_ORDER_REQUEST,
            }),
        ).toMatchObject({
            ...initialOrderState,
            orderRequest: true,
        });
    });
    it('should handle POST_ORDER_SUCCESS', () => {
        expect(
            orderReducer(initialOrderState, {
                type: POST_ORDER_SUCCESS,
                number: 123,
                name: 'Space флюоресцентный био-марсианский бургер',
            }),
        ).toMatchObject({
            ...initialOrderState,
            orderFailed: false,
            number: 123,
            name: 'Space флюоресцентный био-марсианский бургер',
            orderRequest: false,
        });
    });
    it('should handle POST_ORDER_FAILED', () => {
        fetch.mockImplementationOnce(() =>
            Promise.resolve({
                ok: false,
                json: () =>
                    Promise.resolve({
                        success: false,
                    }),
                status: 500,
            }),
        );
        expect(
            orderReducer(
                { ...initialOrderState },
                {
                    type: POST_ORDER_FAILED,
                },
            ),
        ).toMatchObject({
            ...initialOrderState,
            orderFailed: true,
            orderRequest: false,
        });
    });
    it('should handle CLEAR_ORDER_DATA', () => {
        expect(
            orderReducer(
                { ...initialOrderState },
                {
                    type: CLEAR_ORDER_DATA,
                },
            ),
        ).toMatchObject({
            ...initialOrderState,
        });
    });
});
