import classNames from 'classnames';

import { OrdersList } from '../../components/orders-list/orders-list';
import styles from './feed.module.css';

export const FeedPage = () => {
    return (
        <div className={styles.container}>
            <h1 className="text text_type_main-large pt-10 pb-5">
                Лента заказов
            </h1>
            <main className={styles.main}>
                <div className={styles.orders}>
                    <OrdersList />
                </div>

                <section className={styles.stat_layout}>
                    <div className={styles.stat_done}>
                        <h4 className="text text_type_main-medium mb-6">
                            Готовы:
                        </h4>
                        <ul className={styles.stat_list}>
                            <li className="text text_type_digits-default text_color_success">
                                034533
                            </li>
                            <li className="text text_type_digits-default text_color_success">
                                034533
                            </li>
                            <li className="text text_type_digits-default text_color_success">
                                034533
                            </li>
                            <li className="text text_type_digits-default text_color_success">
                                034533
                            </li>
                            <li className="text text_type_digits-default text_color_success">
                                034533
                            </li>
                        </ul>
                    </div>
                    <div className={styles.stat_progress}>
                        <h4 className="text text_type_main-medium mb-6">
                            В работе:
                        </h4>
                        <ul className={styles.stat_list}>
                            <li className="text text_type_digits-default">
                                034538
                            </li>
                            <li className="text text_type_digits-default">
                                034538
                            </li>
                            <li className="text text_type_digits-default">
                                034538
                            </li>
                        </ul>
                    </div>
                    <div className={classNames(styles.stat_all, 'mt-15')}>
                        <h4 className="text text_type_main-medium">
                            Выполнено за все время:
                        </h4>
                        <p className="text text_type_digits-large">28 752</p>
                    </div>
                    <div className={classNames(styles.stat_today, 'mt-15')}>
                        <h4 className="text text_type_main-medium">
                            Выполнено за сегодня:
                        </h4>
                        <p className="text text_type_digits-large">138</p>
                    </div>
                </section>
            </main>
        </div>
    );
};
