import { checkResponse } from './helpers/check-response';

const API_AUTH_REGISTER = 'https://norma.nomoreparties.space/api/auth/register';

export interface IRegisterResponseFailed {
    message: string;
    success: false;
}

export interface IRegisterResponseSuccess {
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
    success: true;
}

export type IRegisterResponse =
    | IRegisterResponseFailed
    | IRegisterResponseSuccess;

export interface IRegisterRequest {
    email: string;
    password: string;
    name: string;
}

export const registerRequest = (
    data: IRegisterRequest,
): Promise<IRegisterResponse> =>
    fetch(API_AUTH_REGISTER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            ...data,
        }),
    }).then(checkResponse);
