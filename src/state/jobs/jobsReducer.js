import {types} from './jobsActions';

export const jobsState = {
	jobs: [],
	dateFilter: null,
	zipcodeFilter: '',
	teamFilter: null,
	newServiceFormOpen: false,
	newServiceForm_02Open: false,
	calendarFetched: false,
	newJob: {
		slotEvent: null,
		customer: null,
		details: null,
	},
};

export default function reducer(state, action) {
	let {payload} = action;
	switch (action.type) {
		case types.CLEAR_FILTERS: {
			return {
				...state,
				dateFilter: null,
				zipcodeFilter: null,
				teamFilter: null,
			};
		}
		case types.SET_ZIP_FILTER: {
			return {
				...state,
				zipcodeFilter: payload,
			};
		}
		case types.SET_TEAM_FILTER: {
			return {
				...state,
				teamFilter: payload,
			};
		}
		case types.SET_NEW_SERVICE_FORM_OPEN:
			return {
				...state,
				newServiceFormOpen: payload,
			};
		case types.SET_NEW_SERVICE_FORM_02_OPEN:
			return {
				...state,
				newServiceForm_02Open: payload,
			};
		case types.SET_SLOT_EVENT:
			return {
				...state,
				newJob: {...state.newJob, slotEvent: payload},
			};
		case types.SET_NEW_JOB_CUSTOMER:
			return {
				...state,
				newJob: {...state.newJob, customer: payload},
			};
		case types.GET_ALL_JOBS:
			return {
				...state,
				jobs: payload,
				calendarFetched: true,
			};
		case types.ADD_JOB_TO_JOBS:
			return {
				...state,
				jobs: [...state.jobs, payload],
			};
		default: {
			return {
				...state,
			};
		}
	}
}
