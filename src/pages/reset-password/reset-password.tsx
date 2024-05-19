import {
    PasswordInput,
    Input,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from '../auth-layout.module.css';

export const ResetPasswordPage = () => {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <h1 className="text text_type_main-medium">
                    Восстановление пароля
                </h1>
                <PasswordInput
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'new-password'}
                    placeholder="Введите новый пароль"
                />
                {/* @ts-ignore */}
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => console.log(e.target.value)}
                    value={''}
                    name={'code'}
                    size={'default'}
                />
                <Button htmlType="button" type="primary" size="medium">
                    Сохранить
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
