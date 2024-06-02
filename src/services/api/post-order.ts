import { fetchWithRefresh } from './helpers/fetch-with-refresh';

const API_ORDERS = 'https://norma.nomoreparties.space/api/orders';

export interface IPostOrderResponseFailed {
    message: string;
    success: false;
}

export interface IPostOrderResponseSuccess {
    name: string;
    order: {
        number: number;
    };
    success: true;
}

export type IPostOrderResponse =
    | IPostOrderResponseFailed
    | IPostOrderResponseSuccess;

export interface IPostOrderRequest {
    ingredients: string[];
    accessToken: string;
}

export const postOrderRequest = (
    data: IPostOrderRequest,
): Promise<IPostOrderResponse> =>
    fetchWithRefresh(API_ORDERS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + data.accessToken,
        },
        body: JSON.stringify({
            ...data,
        }),
    });
