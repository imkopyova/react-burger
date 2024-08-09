import {
    SET_SHOWN_INGREDIENT,
    CLEAR_SHOWN_INGREDIENT,
} from '../actions/shown-ingredient';
import {
    initialShownIngredientState,
    shownIngredientReducer,
} from './shown-ingredient';

const INGREDIENT = {
    _id: 1,
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1234,
    image: 'image.png',
    image_mobile: 'image_mobile.png',
    image_large: 'image_large.png',
    __v: 1,
};

const initialShownIngredientStateWithIngredients = {
    ingredient: INGREDIENT,
};

describe('burger-constructor reducer', () => {
    it('should return the initial state', () => {
        const state = shownIngredientReducer(initialShownIngredientState, {
            type: '',
        });
        expect(state).toEqual(initialShownIngredientState);
    });
    it('should handle SET_SHOWN_INGREDIENT', () => {
        expect(
            shownIngredientReducer(initialShownIngredientState, {
                type: SET_SHOWN_INGREDIENT,
                ingredient: INGREDIENT,
            }),
        ).toMatchObject({
            ingredient: INGREDIENT,
        });
    });
    it('should handle CLEAR_SHOWN_INGREDIENT', () => {
        expect(
            shownIngredientReducer(initialShownIngredientStateWithIngredients, {
                type: CLEAR_SHOWN_INGREDIENT,
                id: '2',
            }),
        ).toMatchObject(initialShownIngredientState);
    });
});
