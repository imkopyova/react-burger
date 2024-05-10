export type TIngredient = {
    _id: string;
    name: string;
    type: 'bun' | 'main' | 'sauce';
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

export type TChosenIngredient = TIngredient & { inConstructorId: string };

export interface IRootState {
    ingredients: IIngredientsState;
    burgerConstructor: IBurgerConstructorState;
    shownIngredientInfo: IShownIngredientInfo;
    order: IOrderState;
}

export interface IIngredientsState {
    ingredients?: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
}

export interface IShownIngredientInfo {
    ingredient: TIngredient;
}

// TODO: Описать типы
export interface IOrderState {
    order: unknown;
}

export interface IBurgerConstructorState {
    bun?: string;
    ingredients: Array<{
        id: string;
        inConstructorId: string;
    }>;
}
