import { UnknownAction } from 'redux';
import { v4 as uuidv4 } from 'uuid';

import { IBurgerConstructorState } from '../models';
import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SORT_INGREDIENTS,
    CLEAR_CONSTRUCTOR,
} from '../actions/burger-constructor';

import type { TBurgerConstructorActions } from '../actions/burger-constructor';

export const initialBurgerConstructorState: IBurgerConstructorState = {
    bun: undefined,
    ingredients: [],
};

export const burgerConstructorReducer = (
    state = initialBurgerConstructorState,
    action: TBurgerConstructorActions,
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
        case SORT_INGREDIENTS: {
            const ingredients = [...state.ingredients];
            ingredients.splice(
                action.toIndex,
                0,
                ingredients.splice(action.fromIndex, 1)[0],
            );
            return {
                ...state,
                ingredients: ingredients,
            };
        }
        case CLEAR_CONSTRUCTOR: {
            return {
                ...initialBurgerConstructorState,
            };
        }
        default: {
            return state;
        }
    }
};
