import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from '../../services/hooks';
import { getOrdersProfile } from '../../services/order-profile/slice';
import { OrdersList } from '../orders-list/orders-list';
import {
    wsConnectOrderProfile,
    wsDisconnectOrderProfile,
} from '../../services/order-profile/actions';

const WS_URL_PROFILE = 'wss://norma.nomoreparties.space/orders';

export const ProfileOrders = () => {
    const orders = useSelector(getOrdersProfile);
    const dispatch = useDispatch();

    const connect = () => dispatch(wsConnectOrderProfile(WS_URL_PROFILE));
    const disconnect = () => dispatch(wsDisconnectOrderProfile);

    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, []);

    return orders?.orders?.length ? (
        <OrdersList orders={orders.orders.slice().reverse()} />
    ) : null;
};
