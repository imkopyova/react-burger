import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Price } from '../price/price';
import {
    getIngredients,
    getBurgerConstructorBun,
    getBurgerConstructorIngredients,
} from '../../services/selectors/selectors';

interface IPrice {
    extraClass?: string;
}

export const TotalPrice = ({ extraClass }: IPrice) => {
    const constructorIngredients = useSelector(getBurgerConstructorIngredients);

    const bun = useSelector(getBurgerConstructorBun);

    const { ingredients } = useSelector(getIngredients);

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
