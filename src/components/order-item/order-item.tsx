import classNames from 'classnames';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useOrderIngredients } from '../../helpers/use-order-ingredients';
import styles from './order-item.module.css';
import { Price } from '../price/price';
import { IngredientsStack } from '../ingredients-stack/ingredients-stack';

interface IOrderItem {
    order: {
        ingredients: string[];
        status: string;
        number: string;
        createdAt: string;
        updatedAt: string;
        _id: string;
    };
}

export const OrderItem = ({ order }: IOrderItem) => {
    const { ingredients, price } = useOrderIngredients({
        ingredientsId: order.ingredients,
    });
    return (
        <div className={classNames(styles.card, 'p-6 mb-4')}>
            <span
                className={classNames(
                    styles.number,
                    'text text_type_digits-default',
                )}
            >
                #{order.number}
            </span>
            <span
                className={classNames(
                    styles.date,
                    'text text_type_main-default text_color_inactive',
                )}
            >
                {<FormattedDate date={new Date(order.createdAt)} />}
            </span>
            <p
                className={classNames(
                    styles.title,
                    'text text_type_main-medium mt-6 mb-6',
                )}
            >
                ?
            </p>
            <div className={styles.ingredients}>
                {ingredients && <IngredientsStack ingredients={ingredients} />}
            </div>
            <div className={styles.price}>
                <Price>{price}</Price>
            </div>
        </div>
    );
};
