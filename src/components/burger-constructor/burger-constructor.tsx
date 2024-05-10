import classNames from 'classnames';
import { useDrop } from 'react-dnd';
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
import type { TIngredient, TChosenIngredient } from '../../services/models';
import { useModal } from '../modal/hooks/use-modal';
import { IngredientStub } from './ingredient-stub/ingredient-stub';

const FIXED_HEIGHT_WITHOUT_SCROLLABLE = 582;

export interface IBurgerConstructor {
    bun?: TIngredient;
    ingredients?: TChosenIngredient[];
    onDropHandler: (id: string) => void;
    onDropIngredient: (id: string) => void;
    onDeleteIngredient: (id: string) => void;
}

export const BurgerConstructor = ({
    bun,
    ingredients,
    onDropHandler,
    onDropIngredient,
    onDeleteIngredient,
}: IBurgerConstructor) => {
    const { isModalOpen, openModal, closeModal } = useModal();

    const [{ isHover: isHoverBun }, dropBunTarget] = useDrop({
        accept: 'bun',
        drop(item: { id: string }) {
            onDropHandler(item.id);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
    });

    const [{ isHover: isHoverIngredient }, dropIngredientTarget] = useDrop({
        accept: 'ingredient',
        drop(item: { id: string }) {
            onDropIngredient(item.id);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
    });

    return (
        <>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails id="034536" />
                </Modal>
            )}
            <section className={classNames(styles.container, 'pl-4')}>
                <div
                    className={classNames(styles.ingredient)}
                    ref={dropBunTarget}
                >
                    {bun ? (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    ) : (
                        <IngredientStub type="bunTop" isHover={isHoverBun} />
                    )}
                </div>
                <Scrollable
                    availableHeight={
                        window.innerHeight - FIXED_HEIGHT_WITHOUT_SCROLLABLE
                    }
                >
                    <div ref={dropIngredientTarget}>
                        {ingredients &&
                            ingredients.map((ingredient, id) => (
                                <div
                                    key={id}
                                    className={classNames(
                                        // TODO: Перенести стили на уровень выше
                                        styles.ingredient,
                                        'pt-4',
                                    )}
                                >
                                    <ConstructorElement
                                        text={ingredient.name}
                                        price={ingredient.price}
                                        thumbnail={ingredient.image}
                                        handleClose={() =>
                                            onDeleteIngredient(
                                                ingredient.inConstructorId,
                                            )
                                        }
                                    />
                                    <DragIcon type="primary" />
                                </div>
                            ))}
                        <IngredientStub
                            type="ingredient"
                            isHover={isHoverIngredient}
                        />
                    </div>
                </Scrollable>
                <div
                    className={classNames(styles.ingredient, 'mt-4')}
                    ref={dropBunTarget}
                >
                    {bun ? (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    ) : (
                        <IngredientStub type="bunBottom" isHover={isHoverBun} />
                    )}
                </div>
                <div className={classNames(styles.order, 'mt-10')}>
                    <Button
                        htmlType="button"
                        type="primary"
                        size="large"
                        extraClass="ml-10"
                        onClick={openModal}
                    >
                        Оформить заказ
                    </Button>
                    <Price extraClass="text_type_digits-medium">{610}</Price>
                </div>
            </section>
        </>
    );
};
