import { IShownIngredientState } from '../models';
import {
    SET_SHOWN_INGREDIENT,
    CLEAR_SHOWN_INGREDIENT,
} from '../actions/shown-ingredient';
import type { TShownIngredient } from '../actions/shown-ingredient';

export const initialShownIngredientState: IShownIngredientState = {
    ingredient: null,
};

export const shownIngredientReducer = (
    state = initialShownIngredientState,
    action: TShownIngredient,
) => {
    switch (action.type) {
        case SET_SHOWN_INGREDIENT: {
            return {
                ...state,
                ingredient: action.ingredient,
            };
        }
        case CLEAR_SHOWN_INGREDIENT: {
            return {
                ...initialShownIngredientState,
            };
        }
        default: {
            return state;
        }
    }
};
