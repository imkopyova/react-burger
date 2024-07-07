import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { OrderItem } from '../../components/order-item/order-item';
import { Scrollable } from '../../components/scrollable/scrollable';
import styles from './orders-list.module.css';

const FIXED_HEIGHT_WITHOUT_SCROLLABLE = 244;

const ORDERS = [
    {
        ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0946',
            '643d69a5c3f7b9001cfa094a',
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
    },
];

export const OrdersList = () => {
    const loading = false;
    const error = false;
    const orders = ORDERS;
    const location = useLocation();
    console.log(location);

    const content = useMemo(() => {
        return (
            <>
                {loading && (
                    <p className="text text_type_main-default">
                        Загружаем ингридиенты...
                    </p>
                )}
                {error && (
                    <p className="text text_type_main-default">
                        Произошла ошибка, попробуйте перезагрузить страницу
                    </p>
                )}
                {orders !== undefined &&
                    orders.map(order => (
                        <Link
                            key={order._id}
                            to={`${location.pathname}/${order.number}`}
                            // state={{ background: location }}
                            className={styles.link}
                        >
                            <OrderItem order={order} />
                        </Link>
                    ))}
            </>
        );
    }, [loading, error, orders]);

    return (
        <Scrollable
            availableHeight={
                window.innerHeight - FIXED_HEIGHT_WITHOUT_SCROLLABLE
            }
        >
            {content}
        </Scrollable>
    );
};
