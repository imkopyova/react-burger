import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { thunkGetIngredients } from '../../services/actions/ingredients';

import { ProtectedRoute } from '../protected-route/protected-route';
import { AppHeader } from '../app-header/app-header';
import { HomePage } from '../../pages/home/home';
import { LoginPage } from '../../pages/login/login';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { ProfileForm } from '../../components/profile-form/profile-form';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import { checkUserAuth } from '../../services/actions/user';

import styles from './app.module.css';

export const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;

    const dispatch = useDispatch();

    useEffect(() => {
        // @ts-ignore
        dispatch(checkUserAuth());
    }, [dispatch]);

    useEffect(() => {
        // @ts-ignore
        dispatch(thunkGetIngredients());
    }, [dispatch]);

    const closeModal = () => {
        navigate(-1);
    };

    return (
        <div className={styles.app}>
            <AppHeader />
            <Routes location={background || location}>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/login"
                    element={
                        <ProtectedRoute
                            unauthorizedOnly
                            component={<LoginPage />}
                        />
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedRoute
                            unauthorizedOnly
                            component={<RegisterPage />}
                        />
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <ProtectedRoute
                            unauthorizedOnly
                            component={<ForgotPasswordPage />}
                        />
                    }
                />
                <Route
                    path="/reset-password"
                    element={
                        <ProtectedRoute
                            unauthorizedOnly
                            component={<ResetPasswordPage />}
                        />
                    }
                />
                <Route
                    path="/profile"
                    element={<ProtectedRoute component={<ProfilePage />} />}
                >
                    <Route path="" element={<ProfileForm />} />
                    <Route path="orders" element={<NotFoundPage />} />
                </Route>
                <Route
                    path="/ingredients/:ingredientId"
                    element={<IngredientDetails />}
                />
                <Route
                    path="*"
                    element={<ProtectedRoute component={<NotFoundPage />} />}
                />
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
