import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/user';

import { useDispatch } from '../../services/hooks';
import styles from '../auth-layout.module.css';

export const RegisterPage = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await dispatch(register({ name: username, email, password }));
        } catch {
            setError('Произошла ошибка авторизации, попробуйте еще раз');
        }
    };
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className="text text_type_main-medium">Регистрация</h1>
                {/* @ts-ignore */}
                <Input
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    name="username"
                    placeholder="Имя"
                    type="text"
                    size="default"
                    required
                />
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
                    Зарегистрироваться
                </Button>
                {error && <p className="text text_type_main-small">{error}</p>}
            </form>
            <div className={styles.nav}>
                <p className="text text_type_main-small text_color_inactive">
                    Уже зарегистрированы?{' '}
                    <Link to="/login" className={styles.link}>
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
};
