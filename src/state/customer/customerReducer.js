import { types } from './customerActions';

export const customerState = {
    loadingNewCustomer: false,
    customers: [],
    errorMessage: null,
};

export default function reducer(state, action) {
    let { payload } = action;

    switch (action.type) {
        case types.ADD_CUSTOMER:
            return {
                ...state,
                customers: payload,
            };
        default:
            return {
                ...state,
            };
    }
}
