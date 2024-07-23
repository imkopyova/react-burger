import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from './services/reducers/ingredients';
import { burgerConstructorReducer } from './services/reducers/burger-constructor';
import { orderReducer } from './services/reducers/order';
import { shownIngredientReducer } from './services/reducers/shown-ingredient';
import { userReducer } from './services/reducers/user';

export const store = configureStore({
    reducer: {
        // @ts-ignore
        ingredients: ingredientsReducer,
        // @ts-ignore
        burgerConstructor: burgerConstructorReducer,
        // @ts-ignore
        order: orderReducer,
        // @ts-ignore
        shownIngredient: shownIngredientReducer,
        // @ts-ignore
        user: userReducer,
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
