import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';

const API_RESET_PASSWORD =
    'https://norma.nomoreparties.space/api/password-reset/reset';

export interface IResetPasswordResponse {
    message: string;
    success: boolean;
}

export interface IResetPasswordRequest {
    password: string;
    token: string;
}

export const resetPasswordRequest = (
    data: IResetPasswordRequest,
): Promise<IResetPasswordResponse> =>
    fetch(API_RESET_PASSWORD, {
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
