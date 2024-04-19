import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

import styles from './app.module.css';

const API_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export const App = () => {
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    // TODO: Избавиться от моргания
    useEffect(() => {
        const getData = async () => {
            setError(false);
            const res = await fetch(API_INGREDIENTS).catch(() => {
                setError(true);
            });
            const { data } = await res?.json();
            setData(data);
            setLoading(false);
        };

        getData();
    }, []);

    return (
        <div className={styles.app}>
            <AppHeader />
            <div className={styles.container}>
                <h1 className="text text_type_main-large pt-10 pb-5">
                    Соберите бургер
                </h1>
                <main className={styles.main}>
                    {data && (
                        <>
                            <BurgerIngredients ingredients={data} />
                            <BurgerConstructor
                                bunTop={data[0]}
                                bunBottom={data[0]}
                                ingredients={[
                                    data[6],
                                    data[5],
                                    data[8],
                                    data[10],
                                    data[10],
                                ]}
                            />
                        </>
                    )}
                    {error && (
                        <p className="text text_type_main-default">
                            Произошла ошибка, попробуйте перезагрузить страницу
                        </p>
                    )}

                    {loading && (
                        <p className="text text_type_main-default">
                            Загружаем ингридиенты...
                        </p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;
