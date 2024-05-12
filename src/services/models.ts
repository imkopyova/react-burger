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
    shownIngredient: IShownIngredientState;
    order: IOrderState;
}

export interface IIngredientsState {
    ingredients?: TIngredient[];
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
}

export interface IShownIngredientState {
    ingredient: TIngredient | null;
}

export interface IOrderState {
    name?: string;
    number?: number;
    orderRequest: boolean;
    orderFailed: boolean;
}

export interface IBurgerConstructorState {
    bun?: string;
    ingredients: Array<{
        id: string;
        inConstructorId: string;
    }>;
}
