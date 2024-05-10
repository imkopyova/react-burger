import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredient-card.module.css';
import { Price } from '../../price/price';
import { Modal } from '../../modal/modal';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';
import type { TIngredient, IRootState } from '../../../services/models';
import { useModal } from '../../modal/hooks/use-modal';

interface IIngredientCard {
    ingredient: TIngredient;
}

export const IngredientCard = ({ ingredient }: IIngredientCard) => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const [quantity, setQuantity] = useState<number>();

    const [{ isDrag }, dragRef] = useDrag({
        type: ingredient.type === 'bun' ? 'bun' : 'ingredient',
        item: { id: ingredient._id },
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        }),
    });

    const constructorBunId = useSelector(
        (store: IRootState) => store.burgerConstructor.bun,
    );

    const constructorIngredients = useSelector(
        (store: IRootState) => store.burgerConstructor.ingredients,
    );

    useEffect(() => {
        if (ingredient.type === 'bun') {
            ingredient._id === constructorBunId
                ? setQuantity(2)
                : setQuantity(undefined);
        } else {
            const quantity = constructorIngredients.reduce(
                (acc, current) =>
                    current.id === ingredient._id ? acc + 1 : acc,
                0,
            );
            setQuantity(quantity);
        }
    }, [constructorBunId, constructorIngredients, ingredient]);

    return (
        <>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <IngredientDetails ingredient={ingredient} />
                </Modal>
            )}
            <div
                className={classNames(
                    styles.card,
                    { [styles.cardDragging]: isDrag },
                    'pr-4 pl-4',
                )}
                onClick={openModal}
                ref={dragRef}
            >
                <img
                    width={240}
                    height={120}
                    alt={ingredient.name}
                    src={ingredient.image}
                    className={styles.image}
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
                {!!quantity && (
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
