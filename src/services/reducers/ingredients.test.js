import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../actions/ingredients';
import { initialIngredientsState, ingredientsReducer } from './ingredients';

const ingredientsFetchResponseMock = [
    {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
    },
    {
        _id: '643d69a5c3f7b9001cfa0947',
        name: 'Плоды Фалленианского дерева',
        type: 'main',
        proteins: 20,
        fat: 5,
        carbohydrates: 55,
        calories: 77,
        price: 874,
        image: 'https://code.s3.yandex.net/react/code/sp_1.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png',
        __v: 0,
    },
];

describe('burger-constructor reducer', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({
                success: true,
                data: ingredientsFetchResponseMock,
            }),
        });
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should return the initial state', () => {
        const state = ingredientsReducer(initialIngredientsState, { type: '' });
        expect(state).toEqual(initialIngredientsState);
    });
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer(initialIngredientsState, {
                type: GET_INGREDIENTS_REQUEST,
            }),
        ).toMatchObject({
            ...initialIngredientsState,
            ingredientsRequest: true,
        });
    });
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            ingredientsReducer(initialIngredientsState, {
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: ingredientsFetchResponseMock,
            }),
        ).toMatchObject({
            ...initialIngredientsState,
            ingredientsFailed: false,
            ingredients: ingredientsFetchResponseMock,
            ingredientsRequest: false,
        });
    });
    it('should handle GET_INGREDIENTS_FAILED', () => {
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
            ingredientsReducer(
                { ...initialIngredientsState },
                {
                    type: GET_INGREDIENTS_FAILED,
                },
            ),
        ).toMatchObject({
            ...initialIngredientsState,
            ingredientsFailed: true,
        });
    });
});
