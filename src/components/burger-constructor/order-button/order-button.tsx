import { useEffect } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '../../modal/modal';
import { OrderDetails } from '../../order-details/order-details';
import { thunkPostOrder } from '../../../services/actions/order';
import { CLEAR_CONSTRUCTOR } from '../../../services/actions/burger-constructor';
import { useModal } from '../../modal/hooks/use-modal';
import { IRootState } from '../../../services/models';

export const OrderButton = () => {
    const { isModalOpen, openModal, closeModal } = useModal();
    const dispatch = useDispatch();

    const { ingredients, bun } = useSelector(
        (store: IRootState) => store.burgerConstructor,
    );

    const order = useSelector((store: IRootState) => store.order);

    const postOrder = () => {
        if (!bun) return;
        const ingredientsIds = ingredients.map(ingredient => ingredient.id);
        // TODO: any
        dispatch(thunkPostOrder([bun, ...ingredientsIds, bun]) as any);
    };

    useEffect(() => {
        if (order?.number) {
            openModal();
            dispatch({ type: CLEAR_CONSTRUCTOR });
        }
    }, [order, openModal, dispatch]);

    return (
        <>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails number={order.number} />
                </Modal>
            )}

            <Button
                htmlType="button"
                type="primary"
                size="large"
                extraClass="ml-10"
                onClick={postOrder}
                disabled={!bun}
            >
                Оформить заказ
            </Button>
        </>
    );
};
