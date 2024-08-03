import { checkResponse } from './helpers/check-response';
import { checkSuccess } from './helpers/check-success';
import { IResponseFailed } from './models';
import { BASE_URL } from './helpers/base-url';
import { TIngredient } from '../models';

export interface IGetIngredientsResponseSuccess {
    data: TIngredient[];
    success: true;
}

export type IGetIngredientsResponse =
    | IResponseFailed
    | IGetIngredientsResponseSuccess;

export const getIngredientsRequest = (): Promise<IGetIngredientsResponse> =>
    fetch(`${BASE_URL}/ingredients`)
        .then(checkResponse<IGetIngredientsResponse>)
        .then(checkSuccess);
