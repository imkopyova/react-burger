import {
    EmailInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../auth-layout.module.css';

export const ForgotPasswordPage = () => {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <EmailInput
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'email'}
                    placeholder="Укажите e-mail"
                    isIcon={false}
                />
                <Button htmlType="button" type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
            <div className={styles.nav}>
                <p className="text text_type_main-small text_color_inactive">
                    Вспомнили пароль?{' '}
                    <a href="/login" className={styles.link}>
                        Войти
                    </a>
                </p>
            </div>
        </div>
    );
};
