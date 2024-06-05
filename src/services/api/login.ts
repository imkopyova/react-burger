import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';
import { IResponseFailed } from './models';
import { BASE_URL } from './helpers/base-url';

export interface ILoginResponseSuccess {
    success: true;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
}

export type ILoginResponse = IResponseFailed | ILoginResponseSuccess;

export interface ILoginRequest {
    email: string;
    password: string;
}

export const loginRequest = (data: ILoginRequest): Promise<ILoginResponse> =>
    fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            ...data,
        }),
    })
        .then(checkResponse)
        .then(checkSuccess);
