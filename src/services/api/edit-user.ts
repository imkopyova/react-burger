import { fetchWithRefresh } from './helpers/fetch-with-refresh';

const API_EDIT_USER = 'https://norma.nomoreparties.space/api/auth/user';

export interface IEditUserResponseFailed {
    message: string;
    success: false;
}

export interface IEditUserResponseSuccess {
    user: {
        email: string;
        name: string;
    };
    success: true;
}

export type IEditUserResponse =
    | IEditUserResponseFailed
    | IEditUserResponseSuccess;

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
    fetchWithRefresh(API_EDIT_USER, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: data.accessToken,
        },
        body: JSON.stringify({
            ...data,
        }),
    });
