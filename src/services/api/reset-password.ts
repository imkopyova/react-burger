const API_RESET_PASSWORD =
    'https://norma.nomoreparties.space/api/password-reset/reset';

export interface IResetPasswordResponse {
    message: string;
    success: false;
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
    }).then(response => response.json());
