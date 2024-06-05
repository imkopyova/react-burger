import classNames from 'classnames';
import { useDrop } from 'react-dnd';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';
import { TotalPrice } from '../total-price/total-price';
import { Scrollable } from '../scrollable/scrollable';
import type { TIngredient, TChosenIngredient } from '../../services/models';
import { IngredientStub } from './ingredient-stub/ingredient-stub';
import { ConstructorIngredient } from './constructor-ingredient/constructor-ingredient';
import { OrderButton } from './order-button/order-button';
import { DropBunZone } from './drop-bun-zone/drop-bun-zone';

const FIXED_HEIGHT_WITHOUT_SCROLLABLE = 582;

export interface IBurgerConstructor {
    bun?: TIngredient;
    ingredients?: TChosenIngredient[];
    onDropHandler: (id: string) => void;
    onDropIngredient: (id: string) => void;
    onDeleteIngredient: (id: string) => void;
    onMoveIngredient: (fromIndex: number, toIndex: number) => void;
}

export const BurgerConstructor = ({
    bun,
    ingredients,
    onDropHandler,
    onDropIngredient,
    onDeleteIngredient,
    onMoveIngredient,
}: IBurgerConstructor) => {
    const [{ isHover: isHoverIngredient }, dropIngredientTarget] = useDrop({
        accept: 'ingredient',
        drop: (item: { id: string }) => {
            onDropIngredient(item.id);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
    });

    return (
        <>
            <section className={classNames(styles.container, 'pl-4')}>
                <DropBunZone onDropHandler={onDropHandler} stubType="bunTop">
                    {bun && (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    )}
                </DropBunZone>
                <Scrollable
                    availableHeight={
                        window.innerHeight - FIXED_HEIGHT_WITHOUT_SCROLLABLE
                    }
                >
                    <div
                        ref={dropIngredientTarget}
                        style={{ minHeight: '200px' }}
                    >
                        <IngredientStub
                            type="ingredient"
                            isHover={isHoverIngredient}
                        >
                            {ingredients && ingredients.length > 0
                                ? ingredients.map((ingredient, index) => (
                                      <ConstructorIngredient
                                          key={ingredient.inConstructorId}
                                          index={index}
                                          onDeleteIngredient={
                                              onDeleteIngredient
                                          }
                                          onMoveIngredient={onMoveIngredient}
                                          ingredient={ingredient}
                                      />
                                  ))
                                : null}
                        </IngredientStub>
                    </div>
                </Scrollable>
                <DropBunZone onDropHandler={onDropHandler} stubType="bunBottom">
                    {bun && (
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    )}
                </DropBunZone>
                <div className={classNames(styles.order, 'mt-10')}>
                    <OrderButton />
                    <TotalPrice extraClass="text_type_digits-medium" />
                </div>
            </section>
        </>
    );
};
