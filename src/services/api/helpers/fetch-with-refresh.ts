import { refreshTokenRequest } from '../refresh-token';

const checkResponse = (response: any) => {
    return response.ok
        ? response.json()
        : response.json().then((error: string) => Promise.reject(error));
};

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
            options.headers.authorization = refreshData.accessToken;
            const response = await fetch(url, options);
            return await checkResponse(response);
        } else {
            return Promise.reject(error);
        }
    }
};
