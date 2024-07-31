import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersWSData, WSStatus } from '../models';

export type TOrderProfileState = {
    status: WSStatus;
    orders?: TOrdersWSData;
    connectionError: string | null;
};

const initialState: TOrderProfileState = {
    status: WSStatus.OFFLINE,
    orders: undefined,
    connectionError: null,
};

export const ordersProfileSlice = createSlice({
    name: 'ordersProfile',
    initialState,
    reducers: {
        wsConnectingOrderProfile: state => {
            state.status = WSStatus.CONNECTING;
        },
        wsOpenOrderProfile: state => {
            state.status = WSStatus.ONLINE;
            state.connectionError = null;
        },
        wsCloseOrderProfile: state => {
            state.status = WSStatus.OFFLINE;
        },
        wsErrorOrderProfile: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessageOrderProfile: (
            state,
            action: PayloadAction<TOrdersWSData>,
        ) => {
            state.orders = action.payload;
        },
    },
    selectors: {
        getOrdersProfile: state => state.orders,
        getWSStatusProfile: state => state.status,
    },
});

export const {
    wsConnectingOrderProfile,
    wsOpenOrderProfile,
    wsCloseOrderProfile,
    wsErrorOrderProfile,
    wsMessageOrderProfile,
} = ordersProfileSlice.actions;

export const { getOrdersProfile, getWSStatusProfile } =
    ordersProfileSlice.selectors;

type TActionCreators = typeof ordersProfileSlice.actions;
export type TInternalActions = ReturnType<
    TActionCreators[keyof TActionCreators]
>;
