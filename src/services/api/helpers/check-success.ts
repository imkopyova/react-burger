// TODO: any
export const checkSuccess = (response: any) => {
    if (response && response.success) {
        return response;
    }

    return Promise.reject(response);
};
