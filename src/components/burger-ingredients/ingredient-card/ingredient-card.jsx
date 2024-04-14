import classNames from 'classnames';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';

export const IngredientCard = ({ name, price, image, quantity }) => {
    return (
        <div className={classNames(styles.card, 'pr-4 pl-4')}>
            <img width={240} height={120} alt={name} src={image} />
            <div className={classNames('mt-1', styles.price)}>
                <span className="text text_type_digits-default">{price}</span>
                <CurrencyIcon type="primary" />
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
