import { IOrderState } from '../models';
import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    CLEAR_ORDER_DATA,
} from '../actions/order';

import type { TOrderActions } from '../actions/order';

export const initialOrderState: IOrderState = {
    orderRequest: false,
    orderFailed: false,
    number: undefined,
    name: undefined,
};

export const orderReducer = (
    state = initialOrderState,
    action: TOrderActions,
) => {
    switch (action.type) {
        case POST_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            };
        }
        case POST_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                number: action.number,
                name: action.name,
                orderRequest: false,
            };
        }
        case POST_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
            };
        }
        case CLEAR_ORDER_DATA: {
            return {
                ...initialOrderState,
            };
        }
        default: {
            return state;
        }
    }
};
