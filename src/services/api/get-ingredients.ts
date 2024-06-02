import { checkResponse } from './helpers/check-response';

const API_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export interface IGetIngredientsResponseFailed {
    message: string;
    success: false;
}

export interface IGetIngredientsResponseSuccess {
    data: string[];
    success: true;
}

export type IGetIngredientsResponse =
    | IGetIngredientsResponseFailed
    | IGetIngredientsResponseSuccess;

export const getIngredientsRequest = (): Promise<IGetIngredientsResponse> =>
    fetch(API_INGREDIENTS).then(checkResponse);
