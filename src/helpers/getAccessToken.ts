/**
 * accessToken хранится в localStorage в виде 'Bearer accessToken'
 * getAccessToken убирает из строки 'Bearer '
 * @returns accessToken
 */
export const getAccessToken = () => {
    return localStorage.getItem('accessToken')?.split(' ')[1];
};
