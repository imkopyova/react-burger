import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    EmailInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../auth-layout.module.css';

export const ForgotPasswordPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(email);

        // navigate('/reset-password');
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <EmailInput
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name="email"
                    placeholder="Укажите e-mail"
                    isIcon={false}
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
            <div className={styles.nav}>
                <p className="text text_type_main-small text_color_inactive">
                    Вспомнили пароль?{' '}
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
};
