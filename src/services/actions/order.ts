import { ThunkAction } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { IRootState } from '../models';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

const API_ORDER = 'https://norma.nomoreparties.space/api/orders';

export interface IOrderResponse {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
}

export async function postOrderRequest(ingredients: string[]) {
    const res = await fetch(API_ORDER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            ingredients,
        }),
    });
    return await res.json();
}

export function thunkPostOrder(
    ingredients: string[],
): ThunkAction<void, IRootState, unknown, UnknownAction> {
    return function (dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST,
        });
        postOrderRequest(ingredients).then(res => {
            if (res && res.success) {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    number: res.order.number,
                    name: res.name,
                });
            } else {
                dispatch({
                    type: POST_ORDER_FAILED,
                });
            }
        });
    };
}
