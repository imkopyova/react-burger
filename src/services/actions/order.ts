import { ThunkAction } from 'redux-thunk';
import { UnknownAction } from 'redux';
import { IRootState } from '../models';
import { postOrderRequest, IPostOrderRequest } from '../api/post-order';

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const CLEAR_ORDER_DATA = 'CLEAR_ORDER_DATA';

export function thunkPostOrder(
    orderData: IPostOrderRequest,
): ThunkAction<void, IRootState, unknown, UnknownAction> {
    return function (dispatch) {
        dispatch({
            type: POST_ORDER_REQUEST,
        });
        postOrderRequest(orderData)
            .then(response => {
                if (!response.success) {
                    throw new Error(response.message);
                }
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    number: response.order.number,
                    name: response.name,
                });
            })
            .catch(() => {
                dispatch({
                    type: POST_ORDER_FAILED,
                });
            });
    };
}
