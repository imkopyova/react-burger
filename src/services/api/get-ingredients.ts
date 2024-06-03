import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';
import { IResponseFailed } from './models';

const API_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export interface IGetIngredientsResponseSuccess {
    data: string[];
    success: true;
}

export type IGetIngredientsResponse =
    | IResponseFailed
    | IGetIngredientsResponseSuccess;

export const getIngredientsRequest = (): Promise<IGetIngredientsResponse> =>
    fetch(API_INGREDIENTS).then(checkResponse).then(checkSuccess);
