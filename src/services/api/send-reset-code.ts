import { checkResponse } from './helpers/check-response';

const API_SEND_RESET_CODE =
    'https://norma.nomoreparties.space/api/password-reset';

export interface ISendResetCodeResponse {
    message: string;
    success: false;
}

export interface ISendResetCodeRequest {
    email: string;
}

export const sendResetCodeRequest = (
    data: ISendResetCodeRequest,
): Promise<ISendResetCodeResponse> =>
    fetch(API_SEND_RESET_CODE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            ...data,
        }),
    }).then(checkResponse);
