import { ILoginResponseSuccess } from './login';
import { ILogoutResponse } from './logout';
import { IRegisterResponseSuccess } from './register';
import {
    IRefreshTokenResponseSuccess,
    IRefreshTokenResponseFailed,
} from './refresh-token';

export const logoutMock = (): Promise<ILogoutResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                success: true,
                message: 'logout',
            });
        }, 1000);
    });
};

export const loginMock = (): Promise<ILoginResponseSuccess> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                success: true,
                user: {
                    email: 'mockuser@gmail.com',
                    name: 'mockuser',
                },
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
            });
        }, 1000);
    });
};

export const registerMock = (): Promise<IRegisterResponseSuccess> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                success: true,
                user: {
                    email: 'mockuser@gmail.com',
                    name: 'mockuser',
                },
                accessToken: 'mock-access-token',
                refreshToken: 'mock-refresh-token',
            });
        }, 1000);
    });
};

export const refreshTokenSuccessMock =
    (): Promise<IRefreshTokenResponseSuccess> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    accessToken: 'mock-access-token',
                    refreshToken: 'mock-refresh-token',
                });
            }, 1000);
        });
    };

export const refreshTokenFailMock =
    (): Promise<IRefreshTokenResponseFailed> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    success: false,
                    message: 'fail',
                });
            }, 1000);
        });
    };

export const refreshTokenServerFailMock =
    (): Promise<IRefreshTokenResponseSuccess> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject();
            }, 1000);
        });
    };
