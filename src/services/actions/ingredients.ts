import { TThunk, TDispatch, TIngredient } from '../models';
import { getIngredientsRequest } from '../api/get-ingredients';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
    'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
    'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' =
    'GET_INGREDIENTS_FAILED';

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TIngredient[];
}

export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TGetIngredientsActions =
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsFailedAction;

export const thunkGetIngredients: TThunk = () => (dispatch: TDispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST,
    });
    getIngredientsRequest()
        .then(response => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                // @ts-ignore
                ingredients: response.data,
            });
        })
        .catch(() => {
            dispatch({
                type: GET_INGREDIENTS_FAILED,
            });
        });
};
