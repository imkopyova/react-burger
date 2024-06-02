import { checkResponse } from './helpers/check-response';

const API_AUTH_LOGIN = 'https://norma.nomoreparties.space/api/auth/login';

export interface ILoginResponseFailed {
    message: string;
    success: false;
}

export interface ILoginResponseSuccess {
    success: true;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
}

export type ILoginResponse = ILoginResponseFailed | ILoginResponseSuccess;

export interface ILoginRequest {
    email: string;
    password: string;
}

export const loginRequest = (data: ILoginRequest): Promise<ILoginResponse> =>
    fetch(API_AUTH_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            ...data,
        }),
    }).then(checkResponse);
