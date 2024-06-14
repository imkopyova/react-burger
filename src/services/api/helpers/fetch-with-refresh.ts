import { refreshTokenRequest } from '../refresh-token';
import { checkResponse, TCheckResponse } from './check-response';

export const fetchWithRefresh = async <T extends TCheckResponse>(
    url: string,
    options: RequestInit,
) => {
    try {
        const response = await fetch(url, options);
        return await checkResponse<T>(response);
    } catch (error: any) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (error.message === 'jwt expired' && refreshToken) {
            const refreshData = await refreshTokenRequest({
                refreshToken,
            });
            // @ts-ignore
            options.headers.Authorization = refreshData.accessToken;
            const response = await fetch(url, options);
            return await checkResponse<T>(response);
        } else {
            return Promise.reject(error);
        }
    }
};
