import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';
import { IResponseFailed } from './models';
import { BASE_URL } from './helpers/base-url';
import { TOrderWSData } from '../models';

export interface IGetOrderResponseSuccess {
    orders: TOrderWSData[];
    success: true;
}

export type IGetOrderResponse = IResponseFailed | IGetOrderResponseSuccess;

export const getOrderRequest = (
    orderId: string,
    accessToken?: string,
): Promise<IGetOrderResponse> =>
    fetch(`${BASE_URL}/orders/${orderId}`, {
        method: 'GET',
        headers: accessToken
            ? {
                  'Content-Type': 'application/json;charset=utf-8',
                  Authorization: accessToken,
              }
            : {},
    })
        .then(checkResponse<IGetOrderResponse>)
        .then(checkSuccess);
