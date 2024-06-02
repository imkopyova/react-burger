interface IResponseFailed {
    message: string;
    success: false;
}

export const checkResponse = (response: Response) => {
    return response.ok
        ? response.json()
        : response
              .json()
              .then((error: IResponseFailed) => Promise.reject(error));
};
