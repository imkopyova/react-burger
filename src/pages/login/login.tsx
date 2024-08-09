import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { useDispatch } from '../../services/hooks';
import styles from '../auth-layout.module.css';
import { login } from '../../services/actions/user';

export const LoginPage = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Отрефакторить
        try {
            await dispatch(login({ email, password }));
        } catch {
            setError('Неверный логин или пароль');
        }
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
                {error && <p className="text text_type_main-small">{error}</p>}
            </form>
            <div className={styles.nav}>
                <p className="text text_type_main-small text_color_inactive">
                    Вы — новый пользователь?{' '}
                    <NavLink to="/register" className={styles.link}>
                        Зарегистрироваться
                    </NavLink>
                </p>
                <p className="text text_type_main-small text_color_inactive">
                    Забыли пароль?{' '}
                    <NavLink to="/forgot-password" className={styles.link}>
                        Восстановить пароль
                    </NavLink>
                </p>
            </div>
        </div>
    );
};
