import { useState } from 'react';
import classNames from 'classnames';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import { Price } from '../../price/price';
import { Modal } from '../../modal/modal';
import { IngredientDetails } from '../../ingredient-details/ingredient-details';

interface IIngredientCard {
    name: string;
    price: number;
    image: string;
    imageLarge: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    quantity?: number;
}

export const IngredientCard = ({
    name,
    price,
    image,
    imageLarge,
    quantity,
    proteins,
    carbohydrates,
    calories,
    fat,
}: IIngredientCard) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <IngredientDetails
                        name={name}
                        image={imageLarge}
                        proteins={proteins}
                        carbohydrates={carbohydrates}
                        calories={calories}
                        fat={fat}
                    />
                </Modal>
            )}
            <div
                className={classNames(styles.card, 'pr-4 pl-4')}
                onClick={() => setShowModal(true)}
            >
                <img width={240} height={120} alt={name} src={image} />
                <div className="mt-1">
                    <Price>{price}</Price>
                </div>
                <h3
                    className={classNames(
                        styles.name,
                        'text text_type_main-default mt-1',
                    )}
                >
                    {name}
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
