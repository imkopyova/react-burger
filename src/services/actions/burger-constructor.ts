export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_INGREDIENT: 'ADD_INGREDIENT' = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';
export const SORT_INGREDIENTS: 'SORT_INGREDIENTS' = 'SORT_INGREDIENTS';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
    readonly id: string;
}

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly id: string;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly id: string;
}

export interface ISortIngredientAction {
    readonly type: typeof SORT_INGREDIENTS;
    readonly toIndex: number;
    readonly fromIndex: number;
}

export interface IClearConstructorAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type TBurgerConstructorActions =
    | IAddBunAction
    | IAddIngredientAction
    | IDeleteIngredientAction
    | ISortIngredientAction
    | IClearConstructorAction;
