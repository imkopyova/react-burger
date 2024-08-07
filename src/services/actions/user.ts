import { TDispatch } from '../models';
import { getUserRequest } from '../api/get-user';
import {
    loginRequest,
    ILoginRequest,
    ILoginResponseSuccess,
} from '../api/login';
import { logoutRequest } from '../api/logout';
import { registerRequest, IRegisterRequest } from '../api/register';
import { editUserRequest, TEditUserData } from '../api/edit-user';
import { TUser } from '../models';

export const SET_USER: 'SET_USER' = 'SET_USER';
export const SET_IS_AUTH_CHECKED: 'SET_IS_AUTH_CHECKED' = 'SET_IS_AUTH_CHECKED';

export interface ISetUserAction {
    readonly type: typeof SET_USER;
    readonly user: TUser | null;
}

export interface ISetIsAuthCheckedAction {
    readonly type: typeof SET_IS_AUTH_CHECKED;
    readonly value: boolean;
}

export type TUserActions = ISetUserAction | ISetIsAuthCheckedAction;

export const setUser = (user: TUser | null): ISetUserAction => ({
    type: SET_USER,
    user,
});

export const setIsAuthChecked = (value: boolean): ISetIsAuthCheckedAction => ({
    type: SET_IS_AUTH_CHECKED,
    value,
});

export const register = (registerData: IRegisterRequest) => {
    return (dispatch: TDispatch) => {
        return registerRequest(registerData).then((response: any) => {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            dispatch(
                setUser({
                    username: response.user.name,
                    email: response.user.email,
                }),
            );
            dispatch(setIsAuthChecked(true));
        });
    };
};

export const login = (loginData: ILoginRequest) => {
    return (dispatch: TDispatch) => {
        return loginRequest(loginData).then(response => {
            localStorage.setItem(
                'accessToken',
                (response as ILoginResponseSuccess).accessToken,
            );
            localStorage.setItem(
                'refreshToken',
                (response as ILoginResponseSuccess).refreshToken,
            );
            dispatch(
                setUser({
                    username: (response as ILoginResponseSuccess).user.name,
                    email: (response as ILoginResponseSuccess).user.email,
                }),
            );
            dispatch(setIsAuthChecked(true));
        });
    };
};

export const logout = () => {
    return (dispatch: TDispatch) => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return;
        return logoutRequest({ refreshToken }).then(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            dispatch(setUser(null));
            dispatch(setIsAuthChecked(true));
        });
    };
};

export const checkUserAuth = () => {
    return (dispatch: TDispatch) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            getUserRequest({ accessToken })
                .then(response => {
                    dispatch(
                        setUser({
                            username: (response as ILoginResponseSuccess).user
                                .name,
                            email: (response as ILoginResponseSuccess).user
                                .email,
                        }),
                    );
                })
                .catch(() => {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                })
                .finally(() => dispatch(setIsAuthChecked(true)));
        } else {
            dispatch(setIsAuthChecked(true));
        }
    };
};

export const editUser = (userData: TEditUserData) => {
    return (dispatch: TDispatch) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            editUserRequest({ ...userData, accessToken })
                .then(response => {
                    dispatch(
                        setUser({
                            username: (response as ILoginResponseSuccess).user
                                .name,
                            email: (response as ILoginResponseSuccess).user
                                .email,
                        }),
                    );
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            throw new Error();
        }
    };
};
