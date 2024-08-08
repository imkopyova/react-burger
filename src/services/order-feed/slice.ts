import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersWSData, WSStatus } from '../models';

export type TOrderFeedState = {
    status: WSStatus;
    orders?: TOrdersWSData;
    connectionError: string | null;
};

const initialState: TOrderFeedState = {
    status: WSStatus.OFFLINE,
    orders: undefined,
    connectionError: null,
};

export const ordersFeedSlice = createSlice({
    name: 'ordersFeed',
    initialState,
    reducers: {
        wsConnecting: state => {
            state.status = WSStatus.CONNECTING;
        },
        wsOpen: state => {
            state.status = WSStatus.ONLINE;
            state.connectionError = null;
        },
        wsClose: state => {
            state.status = WSStatus.OFFLINE;
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload;
        },
        wsMessage: (state, action: PayloadAction<TOrdersWSData>) => {
            state.orders = action.payload;
        },
    },
    selectors: {
        getOrders: state => state.orders,
        getWSStatus: state => state.status,
    },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } =
    ordersFeedSlice.actions;

export const { getOrders, getWSStatus } = ordersFeedSlice.selectors;

type TActionCreators = typeof ordersFeedSlice.actions;
export type TInternalActions = ReturnType<
    TActionCreators[keyof TActionCreators]
>;

export default ordersFeedSlice.reducer;
