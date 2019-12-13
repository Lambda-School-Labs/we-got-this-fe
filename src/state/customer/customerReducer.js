import { types } from './customerActions';
// import service from './customerService';

export const customerState = {
    customers: [],
    customerJobs: [],
    currentCustomer: null,
};

export default function reducer(state, action) {
    let { payload } = action;

    switch (action.type) {
        case types.GET_CUSTOMERS:
            return {
                ...state,
                customers: [...payload],
            };

        case types.ADD_CUSTOMER:
            return {
                ...state,
                customers: [...state.customers, payload],
            };

        case types.GET_CUSTOMER_JOBS:
            return {
                ...state,
                customerJobs: payload,
            };
        case types.SET_CURRENT_CUSTOMER:
            return {
                ...state,
                currentCustomer: payload,
            };
        case types.UPDATE_CUSTOMER:
            let { docId } = payload;

            let updateIndex = state.customers.findIndex(
                user => user.docId == docId
            );
            let updatedCustomer = state.customers[updateIndex];
            updatedCustomer = payload;

            return {
                ...state,
                customers: [...state.customers],
                currentCustomer: {
                    ...state.customers.currentCustomer,
                    ...payload,
                },
            };
        case types.GET_CUSTOMER_IMAGE:
            return {
                ...state,
                currentCustomer: { ...state.currentCustomer, img: payload },
            };
        case types.ADD_JOB_TO_CUSTOMER:
            let { newJobDocId, customerDocId } = payload;
            console.log(
                'New Job Doc Id',
                newJobDocId,
                'Customer Doc Id',
                customerDocId
            );

            let jobIndex = state.customers.findIndex(
                customer => customer.docId == customerDocId
            );
            let customer = state.customers[jobIndex];

            customer.jobs.push(newJobDocId);

            return {
                ...state,
                customers: [...state.customers],
            };
        case types.ADD_UPDATE_IMAGE_TO_JOB:
            //desctructure needed elements off payload
            let { url, tag, note } = payload;

            //Get the job that needs to be updated

            let customerJob = state.customerJobs.find(
                job => job.docId == payload.jobId
            );

            //Add the photo to the job
            //If there is no property photo property on the job already
            if (!customerJob.photos) {
                customerJob.photos = [{ url, tag, note }];
            } else {
                //There are photos already on the job
                customerJob.photos = [
                    ...customerJob.photos,
                    { url, tag, note },
                ];
            }

            return {
                ...state,
                customerJobs: [...state.customerJobs],
            };

        default:
            return {
                ...state,
            };
    }
}
