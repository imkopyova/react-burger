import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from '../nav-link/nav-link';
import styles from './app-header.module.css';
import classNames from 'classnames';

export const AppHeader = () => {
    return (
        <header className={classNames(styles.header, 'pt-4 pb-4')}>
            <div className={styles.content}>
                <nav className={styles.nav}>
                    <NavLink isActive icon={<BurgerIcon type="primary" />}>
                        Конструктор
                    </NavLink>
                    <NavLink icon={<ListIcon type="secondary" />}>
                        Лента заказов
                    </NavLink>
                </nav>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <NavLink icon={<ProfileIcon type="secondary" />}>
                    Личный кабинет
                </NavLink>
            </div>
        </header>
    );
};
