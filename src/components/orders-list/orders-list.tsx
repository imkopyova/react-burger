import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { OrderItem } from '../../components/order-item/order-item';
import { Scrollable } from '../../components/scrollable/scrollable';
import styles from './orders-list.module.css';
import { TOrderWSData } from '../../services/models';

const FIXED_HEIGHT_WITHOUT_SCROLLABLE = 244;

export const OrdersList = ({ orders }: { orders: TOrderWSData[] }) => {
    const loading = false;
    const error = false;
    const location = useLocation();

    const content = useMemo(() => {
        return (
            <div className={styles.list}>
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
                {orders.map(order => (
                    <Link
                        key={order._id}
                        to={`${location.pathname}/${order.number}`}
                        state={{ background: location }}
                        className={styles.link}
                    >
                        <OrderItem withStatus order={order} />
                    </Link>
                ))}
            </div>
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
