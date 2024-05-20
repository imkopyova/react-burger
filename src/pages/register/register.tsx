import { Link, useNavigate } from 'react-router-dom';
import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../auth-layout.module.css';

export const RegisterPage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    };
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h1 className="text text_type_main-medium">Регистрация</h1>
                {/* @ts-ignore */}
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'name'}
                    size={'default'}
                />
                <EmailInput
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'email'}
                    placeholder="E-mail"
                    isIcon={false}
                />
                <PasswordInput
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'password'}
                />
                <Button
                    htmlType="button"
                    type="primary"
                    size="medium"
                    onClick={handleClick}
                >
                    Зарегистрироваться
                </Button>
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
