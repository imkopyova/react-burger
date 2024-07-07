import classNames from 'classnames';

import type { TIngredient } from '../../services/models';
import styles from './ingredient-circle.module.css';

export const IngredientCircle = ({
    ingredient,
    text,
}: {
    ingredient: TIngredient;
    text?: string;
}) => {
    return (
        <div className={styles.circleBorder}>
            <div className={styles.circleBg}>
                <div
                    className={classNames(styles.circle, {
                        [styles.faded]: !!text,
                    })}
                    style={{
                        backgroundImage: `url(${ingredient.image_mobile})`,
                    }}
                />
            </div>
            <span
                className={classNames(
                    styles.text,
                    'text text_type_digits-default',
                )}
            >
                {text}
            </span>
        </div>
    );
};
