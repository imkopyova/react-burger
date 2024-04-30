import { UnknownAction } from 'redux';

import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../actions/ingredients';

import { IIngredientsState } from '../models';

export const initialIngredientsState: IIngredientsState = {
    ingredients: undefined,
    ingredientsFailed: false,
    ingredientsRequest: false,
};

export const ingredientsReducer = (
    state = initialIngredientsState,
    action: UnknownAction,
) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsFailed: false,
                ingredients: action.ingredients,
                ingredientsRequest: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false,
            };
        }
        default: {
            return state;
        }
    }
};
