import { ThunkAction } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { IRootState } from '../models';
import { getIngredientsRequest } from '../api/get-ingredients';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

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
        getIngredientsRequest()
            .then(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: response.data,
                });
            })
            .catch(() => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                });
            });
    };
}
