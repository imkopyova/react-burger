import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';
import { BASE_URL } from './helpers/base-url';

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
    fetch(`${BASE_URL}/password-reset/reset`, {
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
