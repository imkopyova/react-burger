import { UnknownAction } from 'redux';

import { IOrderState } from '../models';
import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
} from '../actions/order';

export const initialOrderState: IOrderState = {
    orderRequest: false,
    orderFailed: false,
    number: undefined,
    name: undefined,
};

export const orderReducer = (
    state = initialOrderState,
    action: UnknownAction,
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
                ...initialOrderState,
                orderFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};
