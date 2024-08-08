import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SORT_INGREDIENTS,
    CLEAR_CONSTRUCTOR,
} from '../actions/burger-constructor';
import {
    initialBurgerConstructorState,
    burgerConstructorReducer,
} from './burger-constructor';

const initialBurgerConstructorStateWithIngredients = {
    ...initialBurgerConstructorState,
    ingredients: [
        {
            id: '0',
            inConstructorId: '000',
        },
        {
            id: '1',
            inConstructorId: '111',
        },
        {
            id: '2',
            inConstructorId: '222',
        },
    ],
};

describe('burger-constructor reducer', () => {
    it('should return the initial state', () => {
        const state = burgerConstructorReducer(initialBurgerConstructorState, {
            type: '',
        });
        expect(state).toEqual(initialBurgerConstructorState);
    });
    it('should handle ADD_BUN', () => {
        expect(
            burgerConstructorReducer(initialBurgerConstructorState, {
                type: ADD_BUN,
                id: 1,
            }),
        ).toMatchObject({
            ...initialBurgerConstructorState,
            bun: 1,
        });
    });
    it('should handle ADD_INGREDIENT', () => {
        expect(
            burgerConstructorReducer(initialBurgerConstructorState, {
                type: ADD_INGREDIENT,
                id: '2',
            }),
        ).toMatchObject({
            ...initialBurgerConstructorState,
            ingredients: [
                ...initialBurgerConstructorState.ingredients,
                {
                    id: '2',
                },
            ],
        });
    });
    it('should handle DELETE_INGREDIENT', () => {
        expect(
            burgerConstructorReducer(
                { ...initialBurgerConstructorStateWithIngredients },
                {
                    type: DELETE_INGREDIENT,
                    id: '111',
                },
            ),
        ).toMatchObject({
            ...initialBurgerConstructorStateWithIngredients,
            ingredients: [
                initialBurgerConstructorStateWithIngredients.ingredients[0],
                initialBurgerConstructorStateWithIngredients.ingredients[2],
            ],
        });
    });
    it('should handle SORT_INGREDIENTS', () => {
        expect(
            burgerConstructorReducer(
                { ...initialBurgerConstructorStateWithIngredients },
                {
                    type: SORT_INGREDIENTS,
                    toIndex: 0,
                    fromIndex: 1,
                },
            ),
        ).toMatchObject({
            ...initialBurgerConstructorStateWithIngredients,
            ingredients: [
                initialBurgerConstructorStateWithIngredients.ingredients[1],
                initialBurgerConstructorStateWithIngredients.ingredients[0],
                initialBurgerConstructorStateWithIngredients.ingredients[2],
            ],
        });
    });
    it('should handle CLEAR_CONSTRUCTOR', () => {
        expect(
            burgerConstructorReducer(
                { ...initialBurgerConstructorStateWithIngredients },
                {
                    type: CLEAR_CONSTRUCTOR,
                    toIndex: 1,
                },
            ),
        ).toMatchObject({
            ...initialBurgerConstructorState,
        });
    });
});
