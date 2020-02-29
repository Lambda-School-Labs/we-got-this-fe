import {service} from './customerService';
import customerModel from '../models/customer';

export const types = {
	ADD_CUSTOMER: 'ADD_CUSTOMERS',
	GET_CUSTOMERS: 'GET_CUSTOMERS',
	GET_CUSTOMER_JOBS: 'GET_CUSTOMER_JOBS',
	SET_CURRENT_CUSTOMER: 'SET_CURRENT_CUSTOMER',
	UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
	GET_CUSTOMER_IMAGE: 'GET_CUSTOMER_IMAGE',
	ADD_JOB_TO_CUSTOMER: 'ADD_JOB_TO_CUSTOMER',
	ADD_IMAGE_TO_JOB: 'ADD_IMAGE_TO_JOB',
	UPDATE_IMAGE_ON_JOB: 'UPDATE_IMAGE_ON_JOB',
	DELETE_IMAGE_ON_JOB: 'DELETE_IMAGE_ON_JOB',
	UPLOAD_UPDATE_CHECKLIST: 'UPLOAD_UPDATE_CHECKLIST',
};

export const actions = {
	async addCustomer(dispatch, values) {
		const formatted = customerModel.formatCustomer(values);
		try {
			let newCustomer = await service.addCustomer(formatted);
			if (!newCustomer) {
				throw new Error('Adding customer failed');
			}
			dispatch({
				type: types.ADD_CUSTOMER,
				payload: newCustomer,
			});
			return newCustomer;
		} catch (err) {
			return err;
		}
	},

	async getCustomers(dispatch) {
		try {
			
			let customers = await service.getCustomers();
			if (!customers) {
				throw new Error('Failed to get customers');
			}

			//sort the customers by name alphabetically
			customers = customers.sort((a, b) => {
				let nameA = a.name.toUpperCase();
				let nameB = b.name.toUpperCase();

				if (nameA < nameB) {
					return -1;
				} else if (nameA > nameB) {
					return 1;
				}
				return 0;
			});

			dispatch({
				type: types.GET_CUSTOMERS,
				payload: customers,
			});
			return true;
		} catch (err) {
			return err;
		}
	},

	async updateCustomer(dispatch, values) {
		const formatted = customerModel.formatUpdateCustomer(values);
		
		try {
			let updatedCustomer = await service.updateCustomer(
				values.docId,
				formatted,
			);
			dispatch({
				type: types.UPDATE_CUSTOMER,
				payload: updatedCustomer,
			});
		} catch (error) {
			return error;
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

	async getCurrentCustomer(dispatch, customerId) {
		try {
			
			let customer = await service.getCurrentCustomer(customerId);
			if (!customer) {
				throw new Error('Failed to get current Customer');
			}
			
			dispatch({
				type: types.SET_CURRENT_CUSTOMER,
				payload: customer,
			});
			return true;
		} catch (err) {
			return err;
		}
	},

	async setCurrentCustomer(dispatch, customer) {
		await dispatch({
			type: types.SET_CURRENT_CUSTOMER,
			payload: customer,
		});
		return true;
	},

	async getCustomerImage(dispatch, customerId) {
		try {
			let customerImg = await service.getCustomerImage(customerId);
			if (!customerImg) {
				throw new Error('Fialed to get customer image');
			}
			dispatch({
				type: types.GET_CUSTOMER_IMAGE,
				payload: customerImg,
			});
			return true;
		} catch (err) {
			return err;
		}
	},
};
