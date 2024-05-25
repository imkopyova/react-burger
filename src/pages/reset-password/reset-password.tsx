import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    PasswordInput,
    Input,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../auth-layout.module.css';

export const ResetPasswordPage = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(password, code);

        // navigate('/login');
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <PasswordInput
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    name="new-password"
                    placeholder="Введите новый пароль"
                    required
                />
                {/* @ts-ignore */}
                <Input
                    type="text"
                    placeholder={'Введите код из письма'}
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    name="code"
                    size="default"
                    required
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
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
