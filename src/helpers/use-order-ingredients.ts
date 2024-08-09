import { useSelector } from '../services/hooks';

export const useOrderIngredients = ({
    ingredientsId,
}: {
    ingredientsId: string[];
}) => {
    const allIngredients = useSelector(state => state.ingredients);
    const ingredients = allIngredients.ingredients?.filter(ingredient =>
        ingredientsId.includes(ingredient._id),
    );
    const price =
        ingredients?.reduce((prev, curr) => prev + curr.price, 0) || 0;

    return {
        ingredients,
        price,
    };
};
