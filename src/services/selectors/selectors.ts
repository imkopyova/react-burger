import { IRootState } from '../../services/models';

export const getIngredients = (store: IRootState) => store.ingredients;

export const getBurgerConstructor = (store: IRootState) =>
    store.burgerConstructor;
export const getBurgerConstructorBun = (store: IRootState) =>
    store.burgerConstructor.bun;
export const getBurgerConstructorIngredients = (store: IRootState) =>
    store.burgerConstructor.ingredients;

export const getOrder = (store: IRootState) => store.order;

export const getShownIngredient = (store: IRootState) =>
    store.shownIngredient.ingredient;

export const geUserState = (store: IRootState) => store.user;
