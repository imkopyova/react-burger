import React from 'react';
import classNames from 'classnames';

import styles from './nav-link.module.css';

export const NavLink = ({ isActive, icon, children }) => {
    const clonedIcon = React.cloneElement(icon, {
        type: isActive ? 'primary' : 'secondary',
    });

    return (
        <a
            href="/"
            className={classNames(
                'text text_type_main-default',
                styles.container,
                { [styles.active]: isActive },
            )}
        >
            {clonedIcon}
            {children}
        </a>
    );
};
