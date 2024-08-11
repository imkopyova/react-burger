import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { wsMiddleware } from './services/middleware/ws-middleware';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { wsConnect, wsDisconnect } from './services/order-feed/actions';
import {
    wsConnectOrderProfile,
    wsDisconnectOrderProfile,
} from './services/order-profile/actions';
import {
    ordersFeedSlice,
    wsClose,
    wsConnecting,
    wsError,
    wsMessage,
    wsOpen,
} from './services/order-feed/slice';
import { orderCurrentSlice } from './services/order-current/slice';

import {
    ordersProfileSlice,
    wsCloseOrderProfile,
    wsConnectingOrderProfile,
    wsErrorOrderProfile,
    wsMessageOrderProfile,
    wsOpenOrderProfile,
} from './services/order-profile/slice';

import { ingredientsReducer } from './services/reducers/ingredients';
import { burgerConstructorReducer } from './services/reducers/burger-constructor';
import { orderReducer } from './services/reducers/order';
import { shownIngredientReducer } from './services/reducers/shown-ingredient';
import { userReducer } from './services/reducers/user';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    shownIngredient: shownIngredientReducer,
    user: userReducer,
    [ordersFeedSlice.reducerPath]: ordersFeedSlice.reducer,
    [ordersProfileSlice.reducerPath]: ordersProfileSlice.reducer,
    [orderCurrentSlice.reducerPath]: orderCurrentSlice.reducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

const ordersFeedWSMiddleware = wsMiddleware({
    connect: wsConnect,
    disconnect: wsDisconnect,
    onConnecting: wsConnecting,
    onOpen: wsOpen,
    onError: wsError,
    onClose: wsClose,
    onMessage: wsMessage,
});

const ordersProfileWSMiddleware = wsMiddleware(
    {
        connect: wsConnectOrderProfile,
        disconnect: wsDisconnectOrderProfile,
        onConnecting: wsConnectingOrderProfile,
        onOpen: wsOpenOrderProfile,
        onError: wsErrorOrderProfile,
        onClose: wsCloseOrderProfile,
        onMessage: wsMessageOrderProfile,
    },
    true,
);

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware().concat(
            ordersFeedWSMiddleware,
            ordersProfileWSMiddleware,
        );
    },
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
