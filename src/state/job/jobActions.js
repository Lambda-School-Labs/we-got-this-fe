import { service } from './jobService';

export const types = {
    ADD_JOB_START: 'ADD_JOB_START',
    ADD_JOB_SUCCESS: 'ADD_JOB_SUCCESS',
    ADD_JOB_ERROR: 'ADD_JOB_ERROR',
};

export const actions = {
    async addJob(dispatch, job) {
        try {
            dispatch({ type: types.ADD_JOB_START });

            let newJob = await service.addJob(customer);
            if (!newJob) {
                throw new Error('Customer failed');
            }

            dispatch({
                type: types.ADD_JOB_SUCCESS,
                payload: newJob,
            });
        } catch (err) {
            dispatch({ type: types.ADD_JOB_ERROR, payload: err });
        }
    },
};