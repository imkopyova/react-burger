import { useEffect } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../../services/hooks';
import { Modal } from '../../modal/modal';
import { OrderDetails } from '../../order-details/order-details';
import { thunkPostOrder } from '../../../services/actions/order';
import { CLEAR_CONSTRUCTOR } from '../../../services/actions/burger-constructor';
import { CLEAR_ORDER_DATA } from '../../../services/actions/order';
import { useModal } from '../../modal/hooks/use-modal';
import { getAccessToken } from '../../../helpers/getAccessToken';
import {
    getBurgerConstructor,
    getOrder,
} from '../../../services/selectors/selectors';

export const OrderButton = () => {
    const navigate = useNavigate();

    const { isModalOpen, openModal, closeModal } = useModal(() => {
        dispatch({ type: CLEAR_CONSTRUCTOR });
        dispatch({ type: CLEAR_ORDER_DATA });
    });
    const dispatch = useDispatch();

    const { ingredients, bun } = useSelector(getBurgerConstructor);
    const order = useSelector(getOrder);

    const postOrder = () => {
        if (!bun) return;
        const ingredientsIds = ingredients.map(ingredient => ingredient.id);

        const accessToken = getAccessToken();
        if (!!accessToken) {
            dispatch(
                thunkPostOrder({
                    ingredients: [bun, ...ingredientsIds, bun],
                    accessToken,
                }),
            );
        } else {
            navigate('/login');
        }
    };

    useEffect(() => {
        if (order?.number) {
            openModal();
        }
    }, [order, openModal]);

    return (
        <>
            {isModalOpen && (
                <Modal onClose={closeModal}>
                    <OrderDetails number={order.number} />
                </Modal>
            )}

            <div data-testid="make-order-button">
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    extraClass="ml-10"
                    onClick={postOrder}
                    disabled={!bun}
                >
                    {order.orderRequest ? 'В процессе...' : 'Оформить заказ'}
                </Button>
            </div>
        </>
    );
};
