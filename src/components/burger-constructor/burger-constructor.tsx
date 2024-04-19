import { useState } from 'react';
import classNames from 'classnames';
import {
    ConstructorElement,
    DragIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { Price } from '../price/price';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import { Scrollable } from '../scrollable/scrollable';
import type { TIngredient } from '../../utils/data';

const FIXED_HEIGHT_WITHOUT_SCROLLABLE = 582;

export interface IBurgerConstructor {
    bunTop: TIngredient;
    bunBottom: TIngredient;
    ingredients: TIngredient[];
}

export const BurgerConstructor = ({
    bunTop,
    bunBottom,
    ingredients,
}: IBurgerConstructor) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <OrderDetails id="034536" />
                </Modal>
            )}
            <section className={classNames(styles.container, 'pl-4')}>
                <div className={classNames(styles.ingredient)}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bunTop.name} (верх)`}
                        price={bunTop.price}
                        thumbnail={bunTop.image}
                    />
                </div>
                <Scrollable
                    availableHeight={
                        window.outerHeight - FIXED_HEIGHT_WITHOUT_SCROLLABLE
                    }
                >
                    <div>
                        {ingredients.map((ingredient, id) => (
                            <div
                                key={id}
                                className={classNames(
                                    styles.ingredient,
                                    'pt-4',
                                )}
                            >
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                />
                                <DragIcon type="primary" />
                            </div>
                        ))}
                    </div>
                </Scrollable>
                <div className={classNames(styles.ingredient, 'mt-4')}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bunBottom.name} (низ)`}
                        price={bunBottom.price}
                        thumbnail={bunBottom.image}
                    />
                </div>
                <div className={classNames(styles.order, 'mt-10')}>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        extraClass="ml-10"
                        onClick={() => setShowModal(true)}
                    >
                        Оформить заказ
                    </Button>
                    <Price extraClass="text_type_digits-medium">{610}</Price>
                </div>
            </section>
        </>
    );
};
