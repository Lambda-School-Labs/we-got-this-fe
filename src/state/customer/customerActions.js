import { service } from './customerService';

export const types = {
    
    ADD_CUSTOMER: 'ADD_CUSTOMER'
    
};

export const actions = {
    async addCustomer(dispatch, values) {
        try {
            // dispatch({ type: types.ADD_CUSTOMER_START });

            let newCustomer = await service.addCustomer(values);
            if (!newCustomer) {
                throw new Error('Customer failed');
            }

            dispatch({
                type: types.ADD_CUSTOMER,
                payload: newCustomer,
            });
            return true;
        } catch (err) {
            return Error;
        }
    },
};
