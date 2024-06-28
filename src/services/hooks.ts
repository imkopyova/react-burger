import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from 'react-redux';
import type { TRootState, TThunk, TDispatch } from './models';

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
// @ts-ignore
export const useDispatch = () => dispatchHook<TDispatch | TThunk>();
