import { service } from './customerService';

export const types = {
    ADD_CUSTOMER: 'ADD_CUSTOMERS',
    GET_CUSTOMERS: 'GET_CUSTOMERS',
    GET_CUSTOMER_JOBS: 'GET_CUSTOMER_JOBS',
};

export const actions = {
    async addCustomer(dispatch, values) {
        const formatValues = values => {
            return {
                name: values.name || 'Unknown',
                contact: {
                    email: values.email || null,
                    phone: values.phoneNumber || null,
                },
                payment: values.payment || null,
                hearabout: values.hearabout || null,
                paymentAmount: null,
                schedule: null,
                jobs: [],
                locations: [
                    {
                        address: {
                            street: values.street,
                            city: values.city,
                            state: values.region,
                            zipcode: values.zipcode,
                        },
                        primary: true,
                        name: `${values.name} Residence`,
                    },
                ],
                notes: values.notes || null,
            };
        };

        try {
            let newCustomer = await service.addCustomer(formatValues(values));
            if (!newCustomer) {
                throw new Error('Adding customer failed');
            }
            dispatch({
                type: types.ADD_CUSTOMER,
                payload: newCustomer,
            });
            return true;
        } catch (err) {
            return err;
        }
    },

    async getCustomers(dispatch) {
        try {
            console.log('Action to get customers called');
            let customers = await service.getCustomers();
            if (!customers) {
                throw new Error('Failed to get customers');
            }
            dispatch({
                type: types.GET_CUSTOMERS,
                payload: customers,
            });
            return true;
        } catch (err) {
            return err;
        }
    },

    async getCustomerJobs(dispatch, jobPaths) {
        try {
            let jobs = await service.getCustomerJobs(jobPaths);
            if (!jobs) {
                throw new Error('Failed to get jobs');
            }
            dispatch({
                type: types.GET_CUSTOMER_JOBS,
                payload: jobs,
            });
            return true;
        } catch (err) {
            return err;
        }
    },
};
