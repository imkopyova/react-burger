import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../auth-layout.module.css';

export const LoginPage = () => {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h1 className="text text_type_main-medium">Вход</h1>
                <EmailInput
                    onChange={e => console.log(e.target)}
                    value={''}
                    name={'email'}
                    placeholder="E-mail"
                    isIcon={false}
                />
                <PasswordInput
                    onChange={e => console.log(e.target)}
                    value={''}
                    name={'password'}
                />
                <Button htmlType="button" type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={styles.nav}>
                <p className="text text_type_main-small text_color_inactive">
                    Вы — новый пользователь?{' '}
                    <a href="/register" className={styles.link}>
                        Зарегистрироваться
                    </a>
                </p>
                <p className="text text_type_main-small text_color_inactive">
                    Забыли пароль?{' '}
                    <a href="/" className={styles.link}>
                        Восстановить пароль
                    </a>
                </p>
            </div>
        </div>
    );
};
