import { useState } from 'react';
import classNames from 'classnames';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { Price } from '../../price/price';
import { Modal } from '../../modal/modal';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';
import type { TIngredient } from '../../../utils/data';

interface IIngredientCard {
    ingredient: TIngredient;
    quantity?: number;
}

export const IngredientCard = ({ ingredient, quantity }: IIngredientCard) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            )}
            <div
                className={classNames(styles.card, 'pr-4 pl-4')}
                onClick={() => setShowModal(true)}
            >
                <img
                    width={240}
                    height={120}
                    alt={ingredient.name}
                    src={ingredient.image}
                />
                <div className="mt-1">
                    <Price>{ingredient.price}</Price>
                </div>
                <h3
                    className={classNames(
                        styles.name,
                        'text text_type_main-default mt-1',
                    )}
                >
                    {ingredient.name}
                </h3>
                {quantity && (
                    <Counter
                        count={quantity}
                        size="default"
                        extraClass={styles.counter}
                    />
                )}
            </div>
        </>
    );
};
