import { IUserState } from '../models';
import { SET_USER, SET_IS_AUTH_CHECKED } from '../actions/user';
import type { TUserActions } from '../actions/user';

export const initialUserState: IUserState = {
    user: null,
    isAuthChecked: false,
};

export const userReducer = (state = initialUserState, action: TUserActions) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                user: action.user,
            };
        }
        case SET_IS_AUTH_CHECKED: {
            return {
                ...state,
                isAuthChecked: action.value,
            };
        }
        default: {
            return state;
        }
    }
};
