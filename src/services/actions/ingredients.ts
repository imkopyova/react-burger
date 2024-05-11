import { ThunkAction } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { IRootState } from '../models';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const API_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export async function getIngredientsRequest() {
    const res = await fetch(API_INGREDIENTS);
    return await res.json();
}

export function thunkGetIngredients(): ThunkAction<
    void,
    IRootState,
    unknown,
    UnknownAction
> {
    return function (dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        getIngredientsRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: res.data,
                });
            } else {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
            }
        });
    };
}
