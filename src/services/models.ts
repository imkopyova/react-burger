import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';

import { store } from '../index';
import type { TBurgerConstructorActions } from './actions/burger-constructor';
import type { TGetIngredientsActions } from './actions/ingredients';
import type { TOrderActions } from './actions/order';
import type { TShownIngredient } from './actions/shown-ingredient';
import type { TUserActions } from './actions/user';
import { rootReducer } from '../index';
import { TExternalActions } from './order-feed/actions';
import { TInternalActions } from './order-feed/slice';

export type TRootState = ReturnType<typeof rootReducer>;

export type TActions =
    | TBurgerConstructorActions
    | TGetIngredientsActions
    | TOrderActions
    | TShownIngredient
    | TUserActions
    | TExternalActions
    | TInternalActions;

export type TThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, TRootState, TActions>
>;

export type TDispatch = Dispatch<TActions>;

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

export type TBurgerConstructorIngredient = {
    id: string;
    inConstructorId: string;
};

export interface IBurgerConstructorState {
    bun?: string;
    ingredients: TBurgerConstructorIngredient[];
}

export type TUser = {
    username: string;
    email: string;
};

export interface IUserState {
    isAuthChecked: boolean;
    user: TUser | null;
}

export enum WSStatus {
    CONNECTING = 'CONNECTING',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE',
}

export type TOrderWSData = {
    ingredients: string[];
    _id: string;
    status: 'pending' | 'created' | 'done';
    number: string;
    name: string;
    /**
     * @example '2021-06-23T14:43:22.587Z'
     */
    createdAt: string;
    /**
     * @example '2021-06-23T14:43:22.603Z'
     */
    updatedAt: string;
};

export type TOrdersWSData = {
    success: boolean;
    orders: TOrderWSData[];
    total: number;
    totalToday: number;
};
