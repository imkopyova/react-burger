import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientCard } from './ingredient-card/ingredient-card';
import { IngredientsSection } from './ingredients-section/ingredients-section';
import { Scrollable } from '../scrollable/scrollable';
import styles from './burger-ingredients.module.css';
import type { TIngredient, IRootState } from '../../services/models';
import { useScrollToElement } from './hooks/use-scroll-to-element';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { useModal } from '../modal/hooks/use-modal';
import {
    SET_SHOWN_INGREDIENT,
    CLEAR_SHOWN_INGREDIENT,
} from '../../services/actions/shown-ingredient';

const FIXED_HEIGHT_WITHOUT_SCROLLABLE = 244;

interface IBurgerIngredients {
    ingredients: TIngredient[];
}

const INGREDIENT_TYPE = {
    bun: 'bun',
    sauce: 'sauce',
    main: 'main',
};

export const BurgerIngredients = ({ ingredients }: IBurgerIngredients) => {
    const dispatch = useDispatch();
    const { isModalOpen, openModal, closeModal } = useModal(() => {
        dispatch({ type: CLEAR_SHOWN_INGREDIENT });
    });
    const buns = ingredients.filter(
        ingredient => ingredient.type === INGREDIENT_TYPE.bun,
    );
    const sauces = ingredients.filter(
        ingredient => ingredient.type === INGREDIENT_TYPE.sauce,
    );
    const mains = ingredients.filter(
        ingredient => ingredient.type === INGREDIENT_TYPE.main,
    );

    const [current, setCurrent] = useState(INGREDIENT_TYPE.bun);

    const tabsRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const bunsRef = useRef<HTMLDivElement>(null);
    const saucesRef = useRef<HTMLDivElement>(null);
    const mainsRef = useRef<HTMLDivElement>(null);

    const { setPosition: setBunsPosition } = useScrollToElement(
        listRef,
        bunsRef,
        tabsRef,
    );

    const { setPosition: setSaucePosition } = useScrollToElement(
        listRef,
        saucesRef,
        tabsRef,
    );

    const { setPosition: setMainPosition } = useScrollToElement(
        listRef,
        mainsRef,
        tabsRef,
    );

    const setBunTab = () => {
        setCurrent(INGREDIENT_TYPE.bun);
        setBunsPosition();
    };

    const setSauceTab = () => {
        setCurrent(INGREDIENT_TYPE.sauce);
        setSaucePosition();
    };

    const setMainTab = () => {
        setCurrent(INGREDIENT_TYPE.main);
        setMainPosition();
    };

    const handleScroll = () => {
        if (
            tabsRef.current &&
            bunsRef.current &&
            saucesRef.current &&
            mainsRef.current
        ) {
            const absolutePlaceToScroll =
                tabsRef.current.getBoundingClientRect().bottom;
            const bunsCoords = bunsRef.current.getBoundingClientRect();
            const saucesCoords = saucesRef.current.getBoundingClientRect();
            const mainsCoords = mainsRef.current.getBoundingClientRect();

            if (absolutePlaceToScroll > bunsCoords.y) {
                setCurrent(INGREDIENT_TYPE.bun);
            }
            if (absolutePlaceToScroll > saucesCoords.y) {
                setCurrent(INGREDIENT_TYPE.sauce);
            }
            if (absolutePlaceToScroll > mainsCoords.y) {
                setCurrent(INGREDIENT_TYPE.main);
            }
        }
    };

    const shownIngredient = useSelector(
        (store: IRootState) => store.shownIngredient.ingredient,
    );

    const showInfo = (ingredient: TIngredient) => {
        dispatch({ type: SET_SHOWN_INGREDIENT, ingredient: ingredient });
    };

    useEffect(() => {
        if (!!shownIngredient) {
            openModal();
        }
    }, [shownIngredient, openModal]);

    return (
        <>
            {isModalOpen && shownIngredient && (
                <Modal onClose={closeModal}>
                    <IngredientDetails ingredient={shownIngredient} />
                </Modal>
            )}
            <section className={styles.container}>
                <div className={styles.tabs} ref={tabsRef}>
                    <Tab
                        value={INGREDIENT_TYPE.bun}
                        active={current === INGREDIENT_TYPE.bun}
                        onClick={setBunTab}
                    >
                        Булки
                    </Tab>
                    <Tab
                        value={INGREDIENT_TYPE.sauce}
                        active={current === INGREDIENT_TYPE.sauce}
                        onClick={setSauceTab}
                    >
                        Соусы
                    </Tab>
                    <Tab
                        value={INGREDIENT_TYPE.main}
                        active={current === INGREDIENT_TYPE.main}
                        onClick={setMainTab}
                    >
                        Начинки
                    </Tab>
                </div>
                <Scrollable
                    handleScroll={handleScroll}
                    ref={listRef}
                    availableHeight={
                        window.innerHeight - FIXED_HEIGHT_WITHOUT_SCROLLABLE
                    }
                >
                    <div>
                        <IngredientsSection name="Булки" ref={bunsRef}>
                            {buns.map(ingredient => (
                                <IngredientCard
                                    key={ingredient._id}
                                    ingredient={ingredient}
                                    onClick={() => showInfo(ingredient)}
                                />
                            ))}
                        </IngredientsSection>

                        <IngredientsSection name="Соусы" ref={saucesRef}>
                            {sauces.map(ingredient => (
                                <IngredientCard
                                    key={ingredient._id}
                                    ingredient={ingredient}
                                    onClick={() => showInfo(ingredient)}
                                />
                            ))}
                        </IngredientsSection>

                        <IngredientsSection name="Начинки" ref={mainsRef}>
                            {mains.map(ingredient => (
                                <IngredientCard
                                    key={ingredient._id}
                                    ingredient={ingredient}
                                    onClick={() => showInfo(ingredient)}
                                />
                            ))}
                        </IngredientsSection>
                    </div>
                </Scrollable>
            </section>
        </>
    );
};
