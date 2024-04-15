import classNames from 'classnames';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { Price } from '../../price/price';

export const IngredientCard = ({ name, price, image, quantity }) => {
    return (
        <div className={classNames(styles.card, 'pr-4 pl-4')}>
            <img width={240} height={120} alt={name} src={image} />
            <div className="mt-1">
                <Price>{price}</Price>
            </div>
            <h3
                className={classNames(
                    styles.name,
                    'text text_type_main-default mt-1',
                )}
            >
                {name}
            </h3>
            {quantity > 0 && (
                <Counter
                    count={quantity}
                    size="default"
                    extraClass={styles.counter}
                />
            )}
        </div>
    );
};
