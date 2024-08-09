import { createAction } from '@reduxjs/toolkit';

export const wsConnect = createAction<string, 'ORDER_FEED_CONNECT'>(
    'ORDER_FEED_CONNECT',
);
export const wsDisconnect = createAction<void, 'ORDER_FEED_DISCONNECT'>(
    'ORDER_FEED_DISCONNECT',
);

export type TExternalActions =
    | ReturnType<typeof wsConnect>
    | ReturnType<typeof wsDisconnect>;
