export type TCheckResponse = {
    success: boolean;
};

export const checkResponse = <T extends TCheckResponse>(
    response: Response,
): Promise<T> => {
    return response.ok
        ? response.json()
        : response.json().then(error => Promise.reject(error));
};
