import { SET_USER, SET_IS_AUTH_CHECKED } from '../actions/user';
import { initialUserState, userReducer } from './user';

describe('burger-constructor reducer', () => {
    it('should return the initial state', () => {
        const state = userReducer(initialUserState, {
            type: '',
        });
        expect(state).toEqual(initialUserState);
    });
    it('should handle SET_USER', () => {
        expect(
            userReducer(initialUserState, {
                type: SET_USER,
                user: {
                    username: 'username',
                    email: 'email@mail.com',
                },
            }),
        ).toMatchObject({
            isAuthChecked: false,
            user: {
                username: 'username',
                email: 'email@mail.com',
            },
        });
    });
    it('should handle SET_IS_AUTH_CHECKED', () => {
        expect(
            userReducer(initialUserState, {
                type: SET_IS_AUTH_CHECKED,
                value: false,
            }),
        ).toMatchObject({ ...initialUserState, isAuthChecked: false });
    });
});
