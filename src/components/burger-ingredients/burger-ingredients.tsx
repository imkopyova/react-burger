import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCard } from './ingredient-card/ingredient-card';
import { IngredientsSection } from './ingredients-section/ingredients-section';
import { Scrollable } from '../scrollable/scrollable';
import styles from './burger-ingredients.module.css';
import type { TIngredient } from '../../utils/data';

const FIXED_HEIGHT_WITHOUT_SCROLLABLE = 244;

interface IBurgerIngredients {
    ingredients: TIngredient[];
}

export const BurgerIngredients = ({ ingredients }: IBurgerIngredients) => {
    const [current, setCurrent] = React.useState('bun');
    const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
    const sauces = ingredients.filter(
        ingredient => ingredient.type === 'sauce',
    );
    const mains = ingredients.filter(ingredient => ingredient.type === 'main');
    return (
        <section className={styles.container}>
            <div className={styles.tabs}>
                <Tab
                    value="bun"
                    active={current === 'bun'}
                    onClick={setCurrent}
                >
                    Булки
                </Tab>
                <Tab
                    value="sauce"
                    active={current === 'sauce'}
                    onClick={setCurrent}
                >
                    Соусы
                </Tab>
                <Tab
                    value="main"
                    active={current === 'main'}
                    onClick={setCurrent}
                >
                    Начинки
                </Tab>
            </div>
            <Scrollable
                availableHeight={
                    window.outerHeight - FIXED_HEIGHT_WITHOUT_SCROLLABLE
                }
            >
                <div>
                    <IngredientsSection name="Булки">
                        {buns.map(ingredient => (
                            <IngredientCard
                                key={ingredient._id}
                                name={ingredient.name}
                                price={ingredient.price}
                                image={ingredient.image}
                                imageLarge={ingredient.image_large}
                                proteins={ingredient.proteins}
                                fat={ingredient.fat}
                                carbohydrates={ingredient.carbohydrates}
                                calories={ingredient.calories}
                                quantity={1}
                            />
                        ))}
                    </IngredientsSection>

                    <IngredientsSection name="Соусы">
                        {sauces.map(ingredient => (
                            <IngredientCard
                                key={ingredient._id}
                                name={ingredient.name}
                                price={ingredient.price}
                                image={ingredient.image}
                                imageLarge={ingredient.image_large}
                                proteins={ingredient.proteins}
                                fat={ingredient.fat}
                                carbohydrates={ingredient.carbohydrates}
                                calories={ingredient.calories}
                            />
                        ))}
                    </IngredientsSection>

                    <IngredientsSection name="Начинки">
                        {mains.map(ingredient => (
                            <IngredientCard
                                key={ingredient._id}
                                name={ingredient.name}
                                price={ingredient.price}
                                image={ingredient.image}
                                imageLarge={ingredient.image_large}
                                proteins={ingredient.proteins}
                                fat={ingredient.fat}
                                carbohydrates={ingredient.carbohydrates}
                                calories={ingredient.calories}
                            />
                        ))}
                    </IngredientsSection>
                </div>
            </Scrollable>
        </section>
    );
};
