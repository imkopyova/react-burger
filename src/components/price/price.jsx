import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './price.module.css';

export const Price = ({ children, extraClass }) => {
    return (
        <div className={styles.price}>
            <span className={`text text_type_digits-default ${extraClass}`}>
                {children}
            </span>
            <CurrencyIcon type="primary" />
        </div>
    );
};
