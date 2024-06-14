import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';
import { IResponseFailed } from './models';
import { BASE_URL } from './helpers/base-url';

export interface IRefreshTokenRequest {
    refreshToken: string;
}

export interface IRefreshTokenResponseSuccess {
    accessToken: string;
    refreshToken: string;
    success: true;
}

export type IRefreshTokenResponse =
    | IResponseFailed
    | IRefreshTokenResponseSuccess;

export const refreshTokenRequest = (
    data: IRefreshTokenRequest,
): Promise<IRefreshTokenResponse> =>
    fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: data.refreshToken,
        }),
    })
        .then(checkResponse<IRefreshTokenResponse>)
        .then(checkSuccess)
        .then(refreshData => {
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            return refreshData;
        })
        .catch(reason => {
            return Promise.reject(reason);
        });
