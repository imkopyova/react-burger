import { ActionCreatorWithPayload, Middleware } from '@reduxjs/toolkit';
import { TRootState } from '../models';
import { refreshTokenRequest } from '../api/refresh-token';

export type TWSActionTypes = {
    connect: ActionCreatorWithPayload<string>;
    // @ts-ignore
    disconnect: ActionCreatorWithPayload;
    sendMessage?: ActionCreatorWithPayload<any>;
    // @ts-ignore
    onConnecting: ActionCreatorWithPayload;
    // @ts-ignore
    onOpen: ActionCreatorWithPayload;
    onError: ActionCreatorWithPayload<string>;
    // @ts-ignore
    onClose: ActionCreatorWithPayload;
    onMessage: ActionCreatorWithPayload<any>;
};

const RECONNECT_PERIOD = 3000;

export const wsMiddleware = (
    wsActions: TWSActionTypes,
    withTokenRefresh: boolean = false,
): Middleware<{}, TRootState> => {
    return (store => {
        let socket: WebSocket | null = null;
        let reconnectTimer = 0;
        let url = '';
        let isConnected = false;
        const {
            connect,
            disconnect,
            onConnecting,
            onOpen,
            onError,
            onClose,
            onMessage,
        } = wsActions;
        const { dispatch } = store;

        return next => action => {
            if (connect.match(action)) {
                socket = new WebSocket(action.payload);
                url = action.payload;
                isConnected = true;
                dispatch(onConnecting());

                socket.onopen = () => {
                    dispatch(onOpen());
                };

                socket.onerror = () => {
                    dispatch(onError('error'));
                };

                socket.onmessage = event => {
                    const { data } = event;
                    try {
                        const parseData = JSON.parse(data);
                        if (
                            withTokenRefresh &&
                            parseData.message === 'Invalid or missing token'
                        ) {
                            const refreshToken =
                                localStorage.getItem('refreshToken');
                            if (refreshToken) {
                                refreshTokenRequest({ refreshToken })
                                    .then(refreshData => {
                                        if (!refreshData.success) return;
                                        const wssUrl = new URL(url);
                                        wssUrl.searchParams.set(
                                            'token',
                                            refreshData.accessToken.replace(
                                                'Bearer ',
                                                '',
                                            ),
                                        );
                                        dispatch(connect(wssUrl.toString()));
                                    })
                                    .catch(e => {
                                        dispatch(
                                            onError(
                                                (e as { message: string })
                                                    .message,
                                            ),
                                        );
                                    });
                            }

                            dispatch(disconnect());

                            return;
                        }
                        dispatch(onMessage(parseData));
                    } catch (error) {
                        dispatch(
                            onError((error as { message: string }).message),
                        );
                    }
                    dispatch(onError('error'));
                };
                socket.onclose = () => {
                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(connect(url));
                        }, RECONNECT_PERIOD);
                    }
                    dispatch(onClose());
                };
            }

            if (socket && disconnect.match(action)) {
                clearTimeout(reconnectTimer);
                reconnectTimer = 0;
                isConnected = false;
                socket.close();
                socket = null;
            }

            next(action);
        };
    }) as Middleware;
};
