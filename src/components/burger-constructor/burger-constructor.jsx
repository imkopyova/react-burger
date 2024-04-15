import classNames from 'classnames';
import {
    ConstructorElement,
    DragIcon,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { Price } from '../price/price';
import { Scrollable } from '../scrollable/scrollable';

const FIXED_HEIGHT_WITHOUT_SCROLLABLE = 582;

export const BurgerConstructor = ({ bunTop, bunBottom, ingredients }) => {
    return (
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
                            className={classNames(styles.ingredient, 'pt-4')}
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
                >
                    Оформить заказ
                </Button>
                <Price extraClass="text_type_digits-medium">610</Price>
            </div>
        </section>
    );
};
