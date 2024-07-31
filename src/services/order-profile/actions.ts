import { createAction } from '@reduxjs/toolkit';

export const wsConnectOrderProfile = createAction<
    string,
    'ORDER_PROFILE_CONNECT'
>('ORDER_PROFILE_CONNECT');
export const wsDisconnectOrderProfile = createAction(
    'ORDER_PROFILE_DISCONNECT',
);

export type TExternalActions =
    | ReturnType<typeof wsConnectOrderProfile>
    | ReturnType<typeof wsDisconnectOrderProfile>;
