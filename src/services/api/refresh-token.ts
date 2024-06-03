import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';
import { IResponseFailed } from './models';

const API_AUTH_TOKEN = 'https://norma.nomoreparties.space/api/auth/token';

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
    fetch(API_AUTH_TOKEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: data.refreshToken,
        }),
    })
        .then(checkResponse)
        .then(checkSuccess)
        .then(refreshData => {
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            localStorage.setItem('accessToken', refreshData.accessToken);
            return refreshData;
        })
        .catch(reason => {
            return Promise.reject(reason);
        });
