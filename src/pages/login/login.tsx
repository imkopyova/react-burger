import { Link, useNavigate } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../auth-layout.module.css';

export const LoginPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };
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
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={handleClick}
                >
                    Войти
                </Button>
            </form>
            <div className={styles.nav}>
                <p className="text text_type_main-small text_color_inactive">
                    Вы — новый пользователь?{' '}
                    <Link to="/register" className={styles.link}>
                        Зарегистрироваться
                    </Link>
                </p>
                <p className="text text_type_main-small text_color_inactive">
                    Забыли пароль?{' '}
                    <Link to="/forgot-password" className={styles.link}>
                        Восстановить пароль
                    </Link>
                </p>
            </div>
        </div>
    );
};
