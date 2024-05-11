import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Price } from '../price/price';
import type { IRootState } from '../../services/models';

interface IPrice {
    extraClass?: string;
}

export const TotalPrice = ({ extraClass }: IPrice) => {
    const constructorIngredients = useSelector(
        (store: IRootState) => store.burgerConstructor.ingredients,
    );

    const bun = useSelector((store: IRootState) => store.burgerConstructor.bun);

    const ingredients = useSelector(
        (store: IRootState) => store.ingredients.ingredients,
    );

    const totalPrice = useMemo(() => {
        const bunPrice =
            ingredients?.find(ingredient => ingredient._id === bun)?.price || 0;
        const ingredientsPrice = constructorIngredients.reduce(
            (acc, current) => {
                const ingredientPrice =
                    ingredients?.find(
                        ingredient => ingredient._id === current.id,
                    )?.price || 0;
                return acc + ingredientPrice;
            },
            0,
        );
        return bunPrice * 2 + ingredientsPrice;
    }, [constructorIngredients, ingredients, bun]);

    return <Price extraClass={extraClass}>{totalPrice}</Price>;
};
