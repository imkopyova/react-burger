import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useOrderIngredients } from '../../helpers/use-order-ingredients';
import { Scrollable } from '../../components/scrollable/scrollable';
import { Price } from '../../components/price/price';
import { IngredientCircle } from '../../components/ingredient-circle/ingredient-circle';
import styles from './order.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { useEffect } from 'react';
import { fetchOrder } from '../../services/order-current/slice';
import { getAccessToken } from '../../helpers/getAccessToken';

const countQuantity = (idsList: string[], id: string) => {
    return idsList.filter(listId => listId === id).length;
};

export const OrderPage = () => {
    let { number: orderId } = useParams();
    let test = useParams();
    console.log(test);
    const dispatch = useDispatch();
    const accessToken = getAccessToken();

    const order = useSelector(state => {
        let order = state.ordersFeed.orders?.orders.find(
            o => o.number === orderId,
        );
        if (order) {
            return order;
        }
        order = state.ordersProfile.orders?.orders.find(
            o => o.number === orderId,
        );
        if (order) {
            return order;
        }
        order = state.orderCurrent.order;
        if (order?.number == orderId) {
            return order;
        }
        return;
    });

    const { ingredients, price } = useOrderIngredients({
        ingredientsId: order?.ingredients || [],
    });

    useEffect(() => {
        console.log(accessToken, orderId, order);
        if (!order && orderId) {
            dispatch(fetchOrder({ orderId, accessToken }));
        }
    }, []);

    return order ? (
        <div className={(styles.container, 'p-10')}>
            <p
                className={classNames(
                    styles.number,
                    'text text_type_digits-default',
                )}
            >
                #{order.number}
            </p>
            <p className="text text_type_main-medium mt-10">{order.name}</p>
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
                            <li
                                key={ingredient._id}
                                className={classNames(styles.row, 'mb-4')}
                            >
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
    ) : null;
};
