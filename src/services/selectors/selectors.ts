import { TRootState } from '../../services/models';

export const getIngredients = (store: TRootState) => store.ingredients;

export const getBurgerConstructor = (store: TRootState) =>
    store.burgerConstructor;
export const getBurgerConstructorBun = (store: TRootState) =>
    store.burgerConstructor.bun;
export const getBurgerConstructorIngredients = (store: TRootState) =>
    store.burgerConstructor.ingredients;

export const getOrder = (store: TRootState) => store.order;

export const getShownIngredient = (store: TRootState) =>
    store.shownIngredient.ingredient;

export const geUserState = (store: TRootState) => store.user;
