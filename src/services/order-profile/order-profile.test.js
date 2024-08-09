import reducer, {
    initialState,
    wsConnectingOrderProfile,
    wsOpenOrderProfile,
    wsCloseOrderProfile,
    wsErrorOrderProfile,
    wsMessageOrderProfile,
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
    it('should handle wsConnectingOrderProfile', () => {
        expect(reducer(initialState, wsConnectingOrderProfile())).toMatchObject(
            {
                ...initialState,
                status: WSStatus.CONNECTING,
            },
        );
    });
    it('should handle wsOpenOrderProfile', () => {
        expect(reducer(initialState, wsOpenOrderProfile())).toMatchObject({
            ...initialState,
            status: WSStatus.ONLINE,
            connectionError: null,
        });
    });
    it('should handle wsCloseOrderProfile', () => {
        expect(reducer(initialState, wsCloseOrderProfile())).toMatchObject({
            ...initialState,
            status: WSStatus.OFFLINE,
        });
    });
    it('should handle wsErrorOrderProfile', () => {
        expect(reducer(initialState, wsErrorOrderProfile(true))).toMatchObject({
            ...initialState,
            connectionError: true,
        });
    });
    it('should handle wsMessageOrderProfile', () => {
        expect(
            reducer(initialState, wsMessageOrderProfile(payloadMock)),
        ).toMatchObject({
            ...initialState,
            orders: payloadMock,
        });
    });
});
