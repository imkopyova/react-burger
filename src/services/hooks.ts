import {
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from 'react-redux';
import type { TRootState, TDispatch } from './models';

export const useSelector = selectorHook.withTypes<TRootState>();

export const useDispatch = dispatchHook.withTypes<TDispatch>();
