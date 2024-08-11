import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { IngredientCard } from './ingredient-card/ingredient-card';
import { IngredientsSection } from './ingredients-section/ingredients-section';
import { Scrollable } from '../scrollable/scrollable';
import styles from './burger-ingredients.module.css';
import type { TIngredient } from '../../services/models';
import { useScrollToElement } from './hooks/use-scroll-to-element';

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
    const location = useLocation();

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

    return (
        <>
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
                                <div data-testid="draggable-bun">
                                    <Link
                                        key={ingredient._id}
                                        to={`/ingredients/${ingredient._id}`}
                                        state={{ background: location }}
                                        className={styles.link}
                                    >
                                        <IngredientCard
                                            ingredient={ingredient}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </IngredientsSection>

                        <IngredientsSection name="Соусы" ref={saucesRef}>
                            {sauces.map(ingredient => (
                                <div data-testid="draggable-sause">
                                    <Link
                                        key={ingredient._id}
                                        to={`/ingredients/${ingredient._id}`}
                                        state={{ background: location }}
                                        className={styles.link}
                                    >
                                        <IngredientCard
                                            ingredient={ingredient}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </IngredientsSection>

                        <IngredientsSection name="Начинки" ref={mainsRef}>
                            {mains.map(ingredient => (
                                <div data-testid="draggable-main">
                                    <Link
                                        key={ingredient._id}
                                        to={`/ingredients/${ingredient._id}`}
                                        state={{ background: location }}
                                        className={styles.link}
                                    >
                                        <IngredientCard
                                            ingredient={ingredient}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </IngredientsSection>
                    </div>
                </Scrollable>
            </section>
        </>
    );
};
