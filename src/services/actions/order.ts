import { TThunk, TDispatch } from '../models';
import { postOrderRequest, IPostOrderRequest } from '../api/post-order';

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED';
export const CLEAR_ORDER_DATA: 'CLEAR_ORDER_DATA' = 'CLEAR_ORDER_DATA';

export interface IPostOrderRequestAction {
    readonly type: typeof POST_ORDER_REQUEST;
}

export interface IPostOrderSuccessAction {
    readonly type: typeof POST_ORDER_SUCCESS;
    readonly number: number;
    readonly name: string;
}

export interface IPostOrderFailedAction {
    readonly type: typeof POST_ORDER_FAILED;
}

export interface IClearOrderDataAction {
    readonly type: typeof CLEAR_ORDER_DATA;
}

export type TOrderActions =
    | IPostOrderRequestAction
    | IPostOrderSuccessAction
    | IPostOrderFailedAction
    | IClearOrderDataAction;

export const thunkPostOrder: TThunk =
    (orderData: IPostOrderRequest) => (dispatch: TDispatch) => {
        dispatch({
            type: POST_ORDER_REQUEST,
        });
        postOrderRequest(orderData)
            .then(response => {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    // @ts-ignore
                    number: response.order.number,
                    // @ts-ignore
                    name: response.name,
                });
            })
            .catch(() => {
                dispatch({
                    type: POST_ORDER_FAILED,
                });
            });
    };
