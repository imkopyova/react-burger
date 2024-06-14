import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';
import { IResponseFailed } from './models';
import { BASE_URL } from './helpers/base-url';

export interface IRegisterResponseSuccess {
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
    success: true;
}

export type IRegisterResponse = IResponseFailed | IRegisterResponseSuccess;

export interface IRegisterRequest {
    email: string;
    password: string;
    name: string;
}

export const registerRequest = (
    data: IRegisterRequest,
): Promise<IRegisterResponse> =>
    fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            ...data,
        }),
    })
        .then(checkResponse<IRegisterResponse>)
        .then(checkSuccess);
