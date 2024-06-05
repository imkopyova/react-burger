import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import styles from './ingredient-details.module.css';
import type { TIngredient } from '../../services/models';
import { getIngredients } from '../../services/selectors/selectors';

export const IngredientDetails = () => {
    let { ingredientId } = useParams();
    const { ingredients } = useSelector(getIngredients);
    const [ingredient, setIngredient] = useState<TIngredient>();

    useEffect(() => {
        if (ingredients) {
            setIngredient(
                ingredients.find(
                    (item: TIngredient) => item._id === ingredientId,
                ),
            );
        }
    }, [ingredients, ingredientId]);

    return (
        <div className={classNames(styles.container, 'p-10 pb-15')}>
            <h3
                className={classNames(
                    styles.title,
                    'text text_type_main-large mt-3',
                )}
            >
                Детали ингредиента
            </h3>
            <img
                className={classNames(styles.image, 'mt-5')}
                alt={ingredient?.name}
                src={ingredient?.image_large}
                width={520}
                height={240}
            />
            <p className="text text_type_main-medium mt-2">
                {ingredient?.name}
            </p>
            <div
                className={classNames(
                    styles.nutrients_layout,
                    'text text_type_main-default text_color_inactive pt-8',
                )}
            >
                <div className={styles.nutrients_item}>
                    <span className="text text_type_main-default text_color_inactive">
                        Калории,ккал
                    </span>
                    <span className="text text_type_digits-default pt-2">
                        {ingredient?.calories}
                    </span>
                </div>
                <div className={styles.nutrients_item}>
                    <span className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </span>
                    <span className="text text_type_digits-default pt-2">
                        {ingredient?.proteins}
                    </span>
                </div>
                <div className={styles.nutrients_item}>
                    <span className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </span>
                    <span className="text text_type_digits-default pt-2">
                        {ingredient?.fat}
                    </span>
                </div>
                <div className={styles.nutrients_item}>
                    <span className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </span>
                    <span className="text text_type_digits-default pt-2">
                        {ingredient?.carbohydrates}
                    </span>
                </div>
            </div>
        </div>
    );
};
