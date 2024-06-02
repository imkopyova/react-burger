import { getUserRequest } from '../api/get-user';
import { loginRequest, ILoginRequest } from '../api/login';
import { logoutRequest } from '../api/logout';
import { registerRequest, IRegisterRequest } from '../api/register';
import { editUserRequest, TEditUserData } from '../api/edit-user';
import { TUser } from '../models';

export const SET_USER = 'SET_USER';
export const SET_IS_AUTH_CHECKED = 'SET_IS_AUTH_CHECKED';

export const setUser = (user: TUser | null) => ({
    type: SET_USER,
    user,
});

export const setIsAuthChecked = (value: boolean) => ({
    type: SET_IS_AUTH_CHECKED,
    value,
});

export const register = (registerData: IRegisterRequest) => {
    return (dispatch: any) => {
        return registerRequest(registerData).then(response => {
            if (!response.success) {
                throw new Error(response.message);
            }
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
    return (dispatch: any) => {
        return loginRequest(loginData).then(response => {
            if (!response.success) {
                throw new Error(response.message);
            }
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

export const logout = () => {
    return (dispatch: any) => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return;
        return logoutRequest({ refreshToken }).then(response => {
            if (!response.success) {
                throw new Error(response.message);
            }
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            dispatch(setUser(null));
            dispatch(setIsAuthChecked(true));
        });
    };
};

export const checkUserAuth = () => {
    return (dispatch: any) => {
        const accessToken = localStorage.getItem('accessToken');
        console.log('checkUserAuth', accessToken);
        if (accessToken) {
            getUserRequest({ accessToken })
                .then(response => {
                    if (!response.success) {
                        throw new Error(response.message);
                    }
                    dispatch(
                        setUser({
                            username: response.user.name,
                            email: response.user.email,
                        }),
                    );
                })
                .catch(e => {
                    console.log('checkUserAuth', e);
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
    return (dispatch: any) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            editUserRequest({ ...userData, accessToken })
                .then(response => {
                    if (!response.success) {
                        throw new Error(response.message);
                    }
                    dispatch(
                        setUser({
                            username: response.user.name,
                            email: response.user.email,
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
