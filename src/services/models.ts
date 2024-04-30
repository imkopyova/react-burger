export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
};

export interface IRootState {
    ingredients: IIngredientsState;
    currentIngredients: ICurrentIngredientsState;
    order: IOrderState;
}

export interface IIngredientsState {
    ingredients?: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
}

// TODO: Описать типы
export interface ICurrentIngredientsState {
    currentIngredients: unknown[];
    currentIngredient: unknown;
}

// TODO: Описать типы
export interface IOrderState {
    order: unknown;
}
