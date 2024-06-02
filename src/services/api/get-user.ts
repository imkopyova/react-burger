import { fetchWithRefresh } from './helpers/fetch-with-refresh';

const API_GET_USER = 'https://norma.nomoreparties.space/api/auth/user';

export interface IGetUserResponseFailed {
    message: string;
    success: false;
}

export interface IGetUserResponseSuccess {
    user: {
        email: string;
        name: string;
    };
    success: true;
}

export type IGetUserResponse = IGetUserResponseFailed | IGetUserResponseSuccess;

export interface IGetUserRequest {
    accessToken: string;
}

export const getUserRequest = ({
    accessToken,
}: IGetUserRequest): Promise<IGetUserResponse> =>
    fetchWithRefresh(API_GET_USER, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: accessToken,
        },
    });
