import type { TIngredient } from '../../services/models';
import { IngredientCircle } from '../ingredient-circle/ingredient-circle';
import styles from './ingredients-stack.module.css';

export const IngredientsStack = ({
    ingredients,
}: {
    ingredients: TIngredient[];
}) => {
    return (
        <div className={styles.ingredientsContainer}>
            <ul className={styles.ingredients}>
                {ingredients.length > 5 && (
                    <li className={styles.ingredientsCell}>
                        <IngredientCircle
                            ingredient={ingredients[5]}
                            text={`${ingredients.length - 5}+`}
                        />
                    </li>
                )}
                {ingredients.slice(0, 5)?.map(ingredient => (
                    <li key={ingredient._id} className={styles.ingredientsCell}>
                        <IngredientCircle ingredient={ingredient} />
                    </li>
                ))}
            </ul>
        </div>
    );
};
