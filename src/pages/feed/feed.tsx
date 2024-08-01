import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { OrdersList } from '../../components/orders-list/orders-list';
import styles from './feed.module.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { getOrders, getWSStatus } from '../../services/order-feed/slice';
import { TOrderWSData, WSStatus } from '../../services/models';
import { wsConnect, wsDisconnect } from '../../services/order-feed/actions';

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';

function chunkArray(arr: unknown[], amount: number) {
    const result = [];
    for (let i = 0; i < arr.length; i += amount) {
        result.push(arr.slice(i, i + amount));
    }
    return result;
}

export const FeedPage = () => {
    const orders = useSelector(getOrders);
    const status = useSelector(getWSStatus);
    const isDisconnected = status !== WSStatus.ONLINE;
    const dispatch = useDispatch();

    const [ordersInProgress, setOrdersInProgress] = useState<TOrderWSData[][]>(
        [],
    );
    const [ordersDone, setOrdersDone] = useState<TOrderWSData[][]>([]);
    const [ordersDoneTotal, setOrdersDoneTotal] = useState<number>();
    const [ordersDoneTotalToday, setOrdersDoneTotalToday] = useState<number>();

    useEffect(() => {
        const inProgress: TOrderWSData[] = [];
        const done: TOrderWSData[] = [];
        orders?.orders.forEach(order => {
            order.status === 'done' ? done.push(order) : inProgress.push(order);
        });

        setOrdersInProgress(
            chunkArray(inProgress, 7).splice(0, 3) as TOrderWSData[][],
        );
        setOrdersDone(chunkArray(done, 7).splice(0, 3) as TOrderWSData[][]);

        setOrdersDoneTotal(orders?.total);
        setOrdersDoneTotalToday(orders?.totalToday);
    }, [orders]);

    const connect = () => dispatch(wsConnect(WS_URL));
    const disconnect = () => dispatch(wsDisconnect());

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, []);

    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-large pt-10 pb-5">
                Лента заказов
            </h1>
            <main className={styles.main}>
                <div className={styles.orders}>
                    {orders?.orders?.length && (
                        <OrdersList orders={orders.orders} />
                    )}
                </div>

                <section className={styles.stat_layout}>
                    <div className={styles.stat_done}>
                        <h4 className="text text_type_main-medium mb-6">
                            Готовы:
                        </h4>
                        <ul className={styles.stat_list}>
                            {ordersDone.map((ordersList, index) => (
                                <li key={index}>
                                    {ordersList.map(order => (
                                        <p
                                            key={order.number}
                                            className="text text_type_digits-default text_color_success"
                                        >
                                            {order.number}
                                        </p>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.stat_progress}>
                        <h4 className="text text_type_main-medium mb-6">
                            В работе:
                        </h4>
                        <ul className={styles.stat_list}>
                            {ordersInProgress.map((ordersList, index) => (
                                <li key={index}>
                                    {ordersList.map(order => (
                                        <p
                                            key={order.number}
                                            className="text text_type_digits-default"
                                        >
                                            {order.number}
                                        </p>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={classNames(styles.stat_all, 'mt-15')}>
                        <h4 className="text text_type_main-medium">
                            Выполнено за все время:
                        </h4>
                        <p className="text text_type_digits-large">
                            {ordersDoneTotal}
                        </p>
                    </div>
                    <div className={classNames(styles.stat_today, 'mt-15')}>
                        <h4 className="text text_type_main-medium">
                            Выполнено за сегодня:
                        </h4>
                        <p className="text text_type_digits-large">
                            {ordersDoneTotalToday}
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
};
