const API_AUTH_LOGOUT = 'https://norma.nomoreparties.space/api/auth/logout';

export interface ILogoutResponse {
    success: boolean;
    message: string;
}

export interface ILogoutRequest {
    refreshToken: string;
}

export const logoutRequest = (data: ILogoutRequest): Promise<ILogoutResponse> =>
    fetch(API_AUTH_LOGOUT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            token: data.refreshToken,
        }),
    }).then(response => response.json());
