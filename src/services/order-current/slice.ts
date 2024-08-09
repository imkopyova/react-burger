import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrderWSData } from '../models';
import { getOrderRequest, IGetOrderResponse } from '../api/get-order';

export type TOrderFeedState = {
    order?: TOrderWSData;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string | null;
};

const initialState: TOrderFeedState = {
    order: undefined,
    status: 'idle',
    error: null,
};

export const fetchOrder = createAsyncThunk(
    'ordersCurrent/fetchOrder',
    async ({
        orderId,
        accessToken,
    }: {
        orderId: string;
        accessToken?: string;
    }) => {
        return await getOrderRequest(orderId, accessToken);
    },
);

export const orderCurrentSlice = createSlice({
    name: 'orderCurrent',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchOrder.pending, (state, action) => {
                state.order = undefined;
                state.status = 'loading';
            })
            .addCase(
                fetchOrder.fulfilled,
                (state, action: PayloadAction<IGetOrderResponse>) => {
                    state.status = 'succeeded';
                    if (action.payload.success) {
                        state.order = action.payload.orders[0];
                    }
                },
            )
            .addCase(fetchOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default orderCurrentSlice.reducer;
