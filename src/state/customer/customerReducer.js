import { types } from './customerActions';

export const customerState = [];

export default function reducer(state, action) {
    let { payload } = action;

    switch (action.type) {
        case types.ADD_CUSTOMER:
            return [...state, payload];
        default:
            return [...state];
    }
}
