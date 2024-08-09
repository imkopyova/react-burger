import reducer, {
    initialState,
    wsConnecting,
    wsOpen,
    wsClose,
    wsError,
    wsMessage,
} from './slice';
import { WSStatus } from '../models';

const payloadMock = {
    success: true,
    orders: [
        {
            _id: '66b534da119d45001b4fe91a',
            ingredients: [
                '643d69a5c3f7b9001cfa093d',
                '643d69a5c3f7b9001cfa0941',
                '643d69a5c3f7b9001cfa093e',
                '643d69a5c3f7b9001cfa0940',
                '643d69a5c3f7b9001cfa093f',
                '643d69a5c3f7b9001cfa0948',
                '643d69a5c3f7b9001cfa0949',
                '643d69a5c3f7b9001cfa0942',
                '643d69a5c3f7b9001cfa0943',
                '643d69a5c3f7b9001cfa093d',
            ],
            status: 'done',
            name: 'Флюоресцентный space люминесцентный бессмертный альфа-сахаридный экзо-плантаго spicy био-марсианский метеоритный бургер',
            createdAt: '2024-08-08T21:12:58.317Z',
            updatedAt: '2024-08-08T21:12:58.763Z',
            number: 48922,
        },
    ],
    total: 48548,
    totalToday: 126,
};

describe('order-profile reducer', () => {
    it('should handle wsConnecting', () => {
        expect(reducer(initialState, wsConnecting())).toMatchObject({
            ...initialState,
            status: WSStatus.CONNECTING,
        });
    });
    it('should handle wsOpen', () => {
        expect(reducer(initialState, wsOpen())).toMatchObject({
            ...initialState,
            status: WSStatus.ONLINE,
            connectionError: null,
        });
    });
    it('should handle wsClose', () => {
        expect(reducer(initialState, wsClose())).toMatchObject({
            ...initialState,
            status: WSStatus.OFFLINE,
        });
    });
    it('should handle wsError', () => {
        expect(reducer(initialState, wsError(true))).toMatchObject({
            ...initialState,
            connectionError: true,
        });
    });
    it('should handle wsMessage', () => {
        expect(reducer(initialState, wsMessage(payloadMock))).toMatchObject({
            ...initialState,
            orders: payloadMock,
        });
    });
});
