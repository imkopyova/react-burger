import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';

import styles from './app.module.css';

import { TIngredient, TChosenIngredient } from '../../services/models';
import {
    getIngredients,
    getBurgerConstructorBun,
    getBurgerConstructorIngredients,
} from '../../services/selectors/selectors';
import { thunkGetIngredients } from '../../services/actions/ingredients';
import {
    ADD_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SORT_INGREDIENTS,
} from '../../services/actions/burger-constructor';

export const App = () => {
    const dispatch = useDispatch();

    const [chosenBun, setChosenBun] = useState<TIngredient>();
    const [chosenIngredients, setChosenIngredients] = useState<
        TChosenIngredient[]
    >([]);

    const {
        ingredients,
        ingredientsRequest: loading,
        ingredientsFailed: error,
    } = useSelector(getIngredients);
    const chosenBunId = useSelector(getBurgerConstructorBun);
    const chosenIngredientsIds = useSelector(getBurgerConstructorIngredients);

    useEffect(() => {
        // TODO: исправить типы
        dispatch(thunkGetIngredients() as any);
    }, [dispatch]);

    useEffect(() => {
        if (!!chosenBunId && !!ingredients) {
            setChosenBun(
                ingredients.find(ingredient => ingredient._id === chosenBunId),
            );
        } else {
            setChosenBun(undefined);
        }
    }, [ingredients, chosenBunId]);

    useEffect(() => {
        if (!!chosenIngredientsIds && !!ingredients) {
            const filteredIngredients: TChosenIngredient[] = [];
            chosenIngredientsIds.forEach(chosen => {
                const newFilteredIngredient = ingredients.find(
                    ingredient => ingredient._id === chosen.id,
                );
                if (newFilteredIngredient) {
                    filteredIngredients.push({
                        ...newFilteredIngredient,
                        inConstructorId: chosen.inConstructorId,
                    });
                }
            });

            setChosenIngredients(filteredIngredients);
        }
    }, [ingredients, chosenIngredientsIds]);

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

    const onDropHandlerBun = (id: string) => {
        dispatch({ type: ADD_BUN, id });
    };

    const onDropIngredient = (id: string) => {
        dispatch({ type: ADD_INGREDIENT, id });
    };

    const onDeleteIngredient = (id: string) => {
        dispatch({ type: DELETE_INGREDIENT, id });
    };

    const onMoveIngredient = (fromIndex: number, toIndex: number) => {
        dispatch({ type: SORT_INGREDIENTS, fromIndex, toIndex });
    };

    return (
        <div className={styles.app}>
            <AppHeader />
            <div className={styles.container}>
                <h1 className="text text_type_main-large pt-10 pb-5">
                    Соберите бургер
                </h1>
                <DndProvider backend={HTML5Backend}>
                    <main className={styles.main}>
                        {content}
                        {/* TODO: Поправить стили заглушек */}
                        <BurgerConstructor
                            bun={chosenBun}
                            ingredients={chosenIngredients}
                            onDropHandler={onDropHandlerBun}
                            onDropIngredient={onDropIngredient}
                            onDeleteIngredient={onDeleteIngredient}
                            onMoveIngredient={onMoveIngredient}
                        />
                    </main>
                </DndProvider>
            </div>
        </div>
    );
};

export default App;
