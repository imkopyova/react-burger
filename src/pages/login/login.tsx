import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../auth-layout.module.css';

export const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(email, password);

        // navigate('/');
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium">Вход</h1>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    placeholder="E-mail"
                    isIcon={false}
                    required
                />
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name="password"
                    required
                />
                <Button htmlType="submit" type="primary" size="medium">
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
