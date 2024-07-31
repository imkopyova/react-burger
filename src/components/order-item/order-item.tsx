import classNames from 'classnames';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useOrderIngredients } from '../../helpers/use-order-ingredients';
import styles from './order-item.module.css';
import { Price } from '../price/price';
import { IngredientsStack } from '../ingredients-stack/ingredients-stack';

interface IOrderItem {
    order: {
        ingredients: string[];
        status: 'pending' | 'created' | 'done';
        number: string;
        name: string;
        createdAt: string;
        updatedAt: string;
        _id: string;
    };
    withStatus?: boolean;
}

export const OrderItem = ({ order, withStatus }: IOrderItem) => {
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
                    'text text_type_main-medium mt-6',
                )}
            >
                {order.name}
            </p>
            {withStatus && (
                <p
                    className={classNames(
                        styles.status,
                        'text text_type_main-small mt-6',
                    )}
                >
                    {order.status === 'done'
                        ? 'Выполнен'
                        : order.status === 'pending'
                          ? 'Готовится'
                          : 'Создан'}
                </p>
            )}
            <div className={classNames(styles.ingredients, 'mt-6')}>
                {ingredients && <IngredientsStack ingredients={ingredients} />}
            </div>
            <div className={styles.price}>
                <Price>{price}</Price>
            </div>
        </div>
    );
};
