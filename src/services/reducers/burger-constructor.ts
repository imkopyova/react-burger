import { UnknownAction } from 'redux';
import { v4 as uuidv4 } from 'uuid';

import { IBurgerConstructorState } from '../models';
import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
} from '../actions/burger-constructor';

export const initialBurgerConstructorState: IBurgerConstructorState = {
    bun: undefined,
    ingredients: [],
};

export const burgerConstructorReducer = (
    state = initialBurgerConstructorState,
    action: UnknownAction,
) => {
    switch (action.type) {
        case ADD_BUN: {
            return {
                ...state,
                bun: action.id,
            };
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    {
                        id: action.id,
                        inConstructorId: uuidv4(),
                    },
                ],
            };
        }
        case DELETE_INGREDIENT: {
            return {
                ...state,
                ingredients: [
                    ...state.ingredients.filter(
                        ingredient => ingredient.inConstructorId !== action.id,
                    ),
                ],
            };
        }
        default: {
            return state;
        }
    }
};
