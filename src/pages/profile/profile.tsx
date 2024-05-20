import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Input,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';

export const ProfilePage = () => {
    return (
        <div className={styles.container}>
            <aside className={styles.aside}>
                <menu className={styles.menu}>
                    <li className={styles.menuItem}>
                        <NavLink
                            to="/profile"
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
                    <li className={styles.menuItem}>
                        <NavLink
                            to="/"
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
                            Выход
                        </NavLink>
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
            <form className={styles.form}>
                {/* @ts-ignore */}
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'name'}
                    size={'default'}
                    icon={'EditIcon'}
                />
                <EmailInput
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'email'}
                    placeholder="Логин"
                    isIcon={true}
                />
                <PasswordInput
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'password'}
                    icon="EditIcon"
                />
            </form>
        </div>
    );
};
