import type { TIngredient } from '../models';

export const SET_SHOWN_INGREDIENT: 'SET_SHOWN_INGREDIENT' =
    'SET_SHOWN_INGREDIENT';
export const CLEAR_SHOWN_INGREDIENT: 'CLEAR_SHOWN_INGREDIENT' =
    'CLEAR_SHOWN_INGREDIENT';

export interface ISetShownIngredientAction {
    readonly type: typeof SET_SHOWN_INGREDIENT;
    readonly ingredient: TIngredient | null;
}

export interface IClearShownIngredientAction {
    readonly type: typeof CLEAR_SHOWN_INGREDIENT;
}

export type TShownIngredient =
    | ISetShownIngredientAction
    | IClearShownIngredientAction;
