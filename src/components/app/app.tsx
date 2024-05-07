import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

import styles from './app.module.css';

import { IRootState } from '../../services/models';
import { thunkGetIngredients } from '../../services/actions/ingredients';

export const App = () => {
    const dispatch = useDispatch();

    const {
        ingredients,
        ingredientsRequest: loading,
        ingredientsFailed: error,
    } = useSelector((store: IRootState) => store.ingredients);

    useEffect(() => {
        // TODO: исправить типы
        dispatch(thunkGetIngredients() as any);
    }, [dispatch]);

    const content = useMemo(() => {
        return (
            <>
                {loading && (
                    <p className="text text_type_main-default">
                        Загружаем ингридиенты...
                    </p>
                )}
                {error && (
                    <p className="text text_type_main-default">
                        Произошла ошибка, попробуйте перезагрузить страницу
                    </p>
                )}
                {ingredients !== undefined && (
                    <BurgerIngredients ingredients={ingredients} />
                )}
            </>
        );
    }, [loading, error, ingredients]);

    return (
        <div className={styles.app}>
            <AppHeader />
            <div className={styles.container}>
                <h1 className="text text_type_main-large pt-10 pb-5">
                    Соберите бургер
                </h1>
                <main className={styles.main}>
                    {content}
                    {/* TODO: Поправить стили заглушек */}
                    <BurgerConstructor />
                </main>
            </div>
        </div>
    );
};

export default App;
