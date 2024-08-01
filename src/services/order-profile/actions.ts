import { createAction } from '@reduxjs/toolkit';

export const wsConnectOrderProfile = createAction<
    string,
    'ORDER_PROFILE_CONNECT'
>('ORDER_PROFILE_CONNECT');
export const wsDisconnectOrderProfile = createAction<
    void,
    'ORDER_PROFILE_DISCONNECT'
>('ORDER_PROFILE_DISCONNECT');

export type TExternalProfileActions =
    | ReturnType<typeof wsConnectOrderProfile>
    | ReturnType<typeof wsDisconnectOrderProfile>;
