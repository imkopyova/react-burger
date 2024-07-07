import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useOrderIngredients } from '../../helpers/use-order-ingredients';
import { Scrollable } from '../../components/scrollable/scrollable';
import { Price } from '../../components/price/price';
import { IngredientCircle } from '../../components/ingredient-circle/ingredient-circle';
import styles from './order.module.css';

const ORDER = {
    ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa093f',
    ],
    _id: '',
    status: 'done',
    number: '034533',
    createdAt: '2021-06-23T14:43:22.587Z',
    updatedAt: '2021-06-23T14:43:22.603Z',
};

const countQuantity = (idsList: string[], id: string) => {
    return idsList.filter(listId => listId === id).length;
};

export const OrderPage = () => {
    let { orderId } = useParams();
    const order = ORDER;
    const { ingredients, price } = useOrderIngredients({
        ingredientsId: order.ingredients,
    });

    return (
        <div className={(styles.container, 'mt-15')}>
            <p
                className={classNames(
                    styles.number,
                    'text text_type_digits-default',
                )}
            >
                #{order.number}
            </p>
            <p className="text text_type_main-medium mt-10">?</p>
            <p
                className={classNames(
                    order.status === 'done' && 'text_color_success',
                    'text text_type_main-default mt-3',
                )}
            >
                {order.status === 'done' ? 'Выполнен' : 'В работе'}
            </p>
            <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
            {ingredients && (
                <Scrollable availableHeight={312}>
                    <ul className={styles.list}>
                        {ingredients.map(ingredient => (
                            <li className={classNames(styles.row, 'mb-4')}>
                                <div className={styles.rowLeft}>
                                    <IngredientCircle ingredient={ingredient} />
                                    <p className="text text_type_main-default">
                                        {ingredient.name}
                                    </p>
                                </div>
                                <div className={styles.rowRight}>
                                    <Price>{`${countQuantity(order.ingredients, ingredient._id)} x ${ingredient.price}`}</Price>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Scrollable>
            )}

            <div
                className={classNames(
                    styles.footer,
                    'text text_type_main-small mt-10',
                )}
            >
                <span className="text_color_inactive">
                    <FormattedDate date={new Date(order.createdAt)} />
                </span>
                <Price>{price}</Price>
            </div>
        </div>
    );
};
