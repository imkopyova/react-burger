import { fetchWithRefresh } from './helpers/fetch-with-refresh';
import { IResponseFailed } from './models';
import { checkSuccess } from './helpers/check-success';
import { BASE_URL } from './helpers/base-url';

export interface IEditUserResponseSuccess {
    user: {
        email: string;
        name: string;
    };
    success: true;
}

export type IEditUserResponse = IResponseFailed | IEditUserResponseSuccess;

export interface IEditUserRequest extends TEditUserData {
    accessToken: string;
}

export type TEditUserData = {
    name?: string;
    email?: string;
    password?: string;
};

export const editUserRequest = (
    data: IEditUserRequest,
): Promise<IEditUserResponse> =>
    fetchWithRefresh(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: data.accessToken,
        },
        body: JSON.stringify({
            ...data,
        }),
    }).then(checkSuccess);
