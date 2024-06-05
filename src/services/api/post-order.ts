import { fetchWithRefresh } from './helpers/fetch-with-refresh';
import { IResponseFailed } from './models';
import { checkSuccess } from './helpers/check-success';
import { BASE_URL } from './helpers/base-url';

export interface IPostOrderResponseSuccess {
    name: string;
    order: {
        number: number;
    };
    success: true;
}

export type IPostOrderResponse = IResponseFailed | IPostOrderResponseSuccess;

export interface IPostOrderRequest {
    ingredients: string[];
    accessToken: string;
}

export const postOrderRequest = (
    data: IPostOrderRequest,
): Promise<IPostOrderResponse> =>
    fetchWithRefresh(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: 'Bearer ' + data.accessToken,
        },
        body: JSON.stringify({
            ...data,
        }),
    }).then(checkSuccess);
