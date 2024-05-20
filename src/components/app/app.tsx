import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { thunkGetIngredients } from '../../services/actions/ingredients';

import { AppHeader } from '../app-header/app-header';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';

import styles from './app.module.css';

export const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const dispatch = useDispatch();

    useEffect(() => {
        // TODO: исправить типы
        dispatch(thunkGetIngredients() as any);
    }, [dispatch]);

    const closeModal = () => {
        navigate(-1);
    };

    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route
                    path="/ingredients/:ingredientId"
                    element={<IngredientDetails />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {background && (
                <Routes>
                    <Route
                        path="/ingredients/:ingredientId"
                        element={
                            <Modal onClose={closeModal}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
};

export default App;
