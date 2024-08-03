import { useState } from 'react';
import { geUserState } from '../../services/selectors/selectors';
import { editUser } from '../../services/actions/user';

import { useDispatch, useSelector } from '../../services/hooks';
import {
    EmailInput,
    PasswordInput,
    Input,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile-form.module.css';

export const ProfileForm = () => {
    const { user } = useSelector(geUserState);
    const dispatch = useDispatch();

    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');

    const [modified, setModified] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (
        value: string | number,
        setValue: (value: any) => void,
    ) => {
        setModified(true);
        setValue(value);
    };

    const handleCancel = () => {
        setUsername(user?.username || '');
        setEmail(user?.email || '');
        setPassword('');
        setModified(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');

        const data: { [key: string]: unknown } = {};
        if (username !== user?.username) {
            data.name = username;
        }

        if (email !== user?.email) {
            data.email = email;
        }

        if (password !== '') {
            data.password = password;
        }

        try {
            await dispatch(editUser(data));
            setModified(false);
        } catch {
            setError('Произошла ошибка, попробуйте еще раз');
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {/* @ts-ignore */}
            <Input
                type="text"
                placeholder="Имя"
                onChange={e => handleChange(e.target.value, setUsername)}
                value={username}
                name="name"
                size="default"
                icon="EditIcon"
            />
            <EmailInput
                onChange={e => handleChange(e.target.value, setEmail)}
                value={email}
                name="email"
                placeholder="Логин"
                isIcon={true}
            />
            <PasswordInput
                onChange={e => handleChange(e.target.value, setPassword)}
                value={password}
                name="password"
                icon="EditIcon"
            />
            {modified && (
                <div className={styles.buttons}>
                    <Button
                        htmlType="button"
                        type="secondary"
                        size="medium"
                        onClick={handleCancel}
                    >
                        Отменить
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
            )}
            {error && <p className="text text_type_main-small">{error}</p>}
        </form>
    );
};
