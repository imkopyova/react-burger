import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';
import { BASE_URL } from './helpers/base-url';

export interface ILogoutResponse {
    success: boolean;
    message: string;
}

export interface ILogoutRequest {
    refreshToken: string;
}

export const logoutRequest = (data: ILogoutRequest): Promise<ILogoutResponse> =>
    fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: data.refreshToken,
        }),
    })
        .then(checkResponse)
        .then(checkSuccess);
