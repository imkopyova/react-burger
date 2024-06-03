import { fetchWithRefresh } from './helpers/fetch-with-refresh';
import { IResponseFailed } from './models';
import { checkSuccess } from './helpers/check-success';

const API_GET_USER = 'https://norma.nomoreparties.space/api/auth/user';

export interface IGetUserResponseSuccess {
    user: {
        email: string;
        name: string;
    };
    success: true;
}

export type IGetUserResponse = IResponseFailed | IGetUserResponseSuccess;

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
    }).then(checkSuccess);
