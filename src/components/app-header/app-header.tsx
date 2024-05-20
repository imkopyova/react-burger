import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import { HeaderNav } from './header-nav';
import styles from './app-header.module.css';
import classNames from 'classnames';

export const AppHeader = () => {
    return (
        <header className={classNames(styles.header, 'pt-4 pb-4')}>
            <div className={styles.content}>
                <nav className={styles.nav}>
                    <HeaderNav to="/" icon={<BurgerIcon type="secondary" />}>
                        Конструктор
                    </HeaderNav>
                    <HeaderNav to="/feed" icon={<ListIcon type="secondary" />}>
                        Лента заказов
                    </HeaderNav>
                </nav>
                <div className={styles.logo}>
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <HeaderNav
                    to="/profile"
                    icon={<ProfileIcon type="secondary" />}
                >
                    Личный кабинет
                </HeaderNav>
            </div>
        </header>
    );
};
