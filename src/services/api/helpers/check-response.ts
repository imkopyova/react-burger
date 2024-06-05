import { IResponseFailed } from '../models';

export const checkResponse = (response: Response) => {
    return response.ok
        ? response.json()
        : response
              .json()
              .then((error: IResponseFailed) => Promise.reject(error));
};
