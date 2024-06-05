import { fetchWithRefresh } from './helpers/fetch-with-refresh';
import { IResponseFailed } from './models';
import { checkSuccess } from './helpers/check-success';
import { BASE_URL } from './helpers/base-url';

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
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: accessToken,
        },
    }).then(checkSuccess);
