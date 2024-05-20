import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import styles from './app-header.module.css';

interface INavLink {
    icon: React.ReactElement;
    children: string;
    to: string;
}

export const HeaderNav = ({ icon, children, to }: INavLink) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(
                    'text text_type_main-default',
                    styles.navLinkContainer,
                    {
                        [styles.navLinkContainerActive]: isActive,
                    },
                )
            }
        >
            {({ isActive }) => (
                <>
                    {React.cloneElement(icon, {
                        type: isActive ? 'primary' : 'secondary',
                    })}
                    {children}
                </>
            )}
        </NavLink>
    );
};
