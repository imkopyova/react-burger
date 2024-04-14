import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from '../nav-link/nav-link';
import styles from './app-header.module.css';

export const AppHeader = () => {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <nav className={styles.nav}>
                    <NavLink isActive icon={<BurgerIcon />}>
                        Конструктор
                    </NavLink>
                    <NavLink icon={<ListIcon />}>Лента заказов</NavLink>
                </nav>
                <div className={styles.logo}>
                    <Logo />
                </div>
                <NavLink icon={<ProfileIcon />}>Личный кабинет</NavLink>
            </div>
        </header>
    );
};
