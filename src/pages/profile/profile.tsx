import classNames from 'classnames';
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
                        <a
                            href="/profile"
                            className={classNames(
                                styles.menuLink,
                                styles.menuLinkActive,
                                'text text_type_main-medium',
                            )}
                        >
                            Профиль
                        </a>
                    </li>
                    <li className={styles.menuItem}>
                        <a
                            href="/profile"
                            className={classNames(
                                styles.menuLink,
                                'text text_type_main-medium text_color_inactive',
                            )}
                        >
                            История заказов
                        </a>
                    </li>
                    <li className={styles.menuItem}>
                        <a
                            href="/"
                            className={classNames(
                                styles.menuLink,
                                'text text_type_main-medium text_color_inactive',
                            )}
                        >
                            Выход
                        </a>
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
