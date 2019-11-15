import { service } from './customerService';

export const types = {
    ADD_CUSTOMERS_START: 'ADD_CUSTOMERS_START',
    ADD_CUSTOMER_SUCCESS: 'ADD_CUSTOMER_SUCCESS',
    ADD_CUSTOMER_ERROR: 'ADD_CUSTOMER_ERROR',
};

export const actions = {
    async addCustomer(dispatch, customer) {
        try {
            dispatch({ type: types.ADD_CUSTOMER_START });

            let newCustomer = await service.addCustomer(customer);
            if (!newCustomer) {
                throw new Error('Customer failed');
            }

            dispatch({
                type: types.ADD_CUSTOMER_SUCCESS,
                payload: newCustomer,
            });
        } catch (err) {
            dispatch({ type: types.ADD_CUSTOMER_ERROR, payload: err });
        }
    },
};
