import { types } from './jobActions';

export const jobState = {
    loadingNewJob: false,
    jobs: [],
    errorMessage: null,
};

export default function reducer(state, action) {
    let { payload } = action;

    switch (action.type) {
        case types.ADD_JOB_START:
            return {
                ...state,
                loadingNewJob: true,
            };
        case types.ADD_JOB_SUCCESS:
            return {
                ...state,
                loadingNewJob: false,
                JOBs: [...state.jobs, payload],
            };
        default:
            return {
                ...state,
            };
    }
}
