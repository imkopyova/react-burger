import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import { logout } from '../../services/actions/user';
import styles from './profile.module.css';

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await dispatch(logout() as any);
        } catch (error) {
            console.log('Ошибка:', error);
        }
    };
    return (
        <div className={styles.container}>
            <aside className={styles.aside}>
                <menu className={styles.menu}>
                    <li className={styles.menuItem}>
                        <NavLink
                            to="/profile"
                            end
                            className={({ isActive }) =>
                                classNames(
                                    'text text_type_main-medium',
                                    styles.menuLink,
                                    {
                                        [styles.menuLinkActive]: isActive,
                                    },
                                )
                            }
                        >
                            Профиль
                        </NavLink>
                    </li>
                    <li className={styles.menuItem}>
                        <NavLink
                            to="/profile/orders"
                            className={({ isActive }) =>
                                classNames(
                                    'text text_type_main-medium',
                                    styles.menuLink,
                                    {
                                        [styles.menuLinkActive]: isActive,
                                    },
                                )
                            }
                        >
                            История заказов
                        </NavLink>
                    </li>
                    <li
                        className={classNames(
                            styles.menuItem,
                            styles.menuLink,
                            'text text_type_main-medium',
                        )}
                        onClick={handleLogout}
                    >
                        Выход
                    </li>
                </menu>
                <p
                    className={classNames(
                        styles.note,
                        'text text_type_main-small text_color_inactive',
                    )}
                >
                    В этом разделе вы можете <br /> изменить свои персональные
                    данные
                </p>
            </aside>
            <Outlet />
        </div>
    );
};
