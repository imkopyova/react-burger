import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';
import { BASE_URL } from './helpers/base-url';

export interface ISendResetCodeResponse {
    message: string;
    success: boolean;
}

export interface ISendResetCodeRequest {
    email: string;
}

export const sendResetCodeRequest = (
    data: ISendResetCodeRequest,
): Promise<ISendResetCodeResponse> =>
    fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            ...data,
        }),
    })
        .then(checkResponse<ISendResetCodeResponse>)
        .then(checkSuccess);
