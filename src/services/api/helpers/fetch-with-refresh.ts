import { refreshTokenRequest } from '../refresh-token';
import { checkResponse } from './check-response';

export const fetchWithRefresh = async (url: string, options: any) => {
    try {
        const response = await fetch(url, options);
        return await checkResponse(response);
    } catch (error: any) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (error.message === 'jwt expired') {
            const refreshData = await refreshTokenRequest({
                // @ts-ignore
                refreshToken,
            });
            // @ts-ignore
            options.headers.Authorization = refreshData.accessToken;
            const response = await fetch(url, options);
            return await checkResponse(response);
        } else {
            return Promise.reject(error);
        }
    }
};
