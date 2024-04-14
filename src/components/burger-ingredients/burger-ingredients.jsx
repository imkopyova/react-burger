import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientCard } from './ingredient-card/ingredient-card';
import { IngredientsSection } from './ingredients-section/ingredients-section';
import styles from './burger-ingredients.module.css';
import { DATA } from '../../utils/data';

export const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('bun');
    const buns = DATA.filter(ingredient => ingredient.type === 'bun');
    const sauces = DATA.filter(ingredient => ingredient.type === 'sauce');
    const mains = DATA.filter(ingredient => ingredient.type === 'main');
    return (
        <div className={styles.container}>
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
            <IngredientsSection name="Булки">
                {buns.map(ingredient => (
                    <IngredientCard
                        key={ingredient._id}
                        name={ingredient.name}
                        price={ingredient.price}
                        image={ingredient.image}
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
                    />
                ))}
            </IngredientsSection>
        </div>
    );
};
