import { service as jobService } from './jobsService';
import { actions as customerActions } from '../customer/customerActions';

import jobModel from '../models/job';

import { types as customerTypes } from '../customer/customerActions';

export const types = {
    SET_DATE_FILTER: 'jobs/set_date_filter',
    SET_ZIP_FILTER: 'jobs/set_zip_filter',
    SET_TEAM_FILTER: 'jobs/set_team_filter',
    CLEAR_FILTERS: 'jobs/clear_filters',
    SET_NEW_SERVICE_FORM_OPEN: 'jobs/set_new_service_form_open',
    SET_NEW_SERVICE_FORM_02_OPEN: 'jobs/set_new_service_form_02_open',
    SET_NEW_JOB_CUSTOMER: 'jobs/set_new_job_customer',
    SET_SLOT_EVENT: 'jobs/set_slot_event',
    ADD_JOB_TO_JOBS: 'jobs/add_job_to_jobs',
};

export const actions = {
    setZipFilter(dispatch, zipcode) {
        dispatch({ type: types.SET_ZIP_FILTER, payload: zipcode });
    },
    setTeamFilter(dispatch, team) {
        dispatch({ type: types.SET_TEAM_FILTER, payload: team });
    },
    setDateFilter(dispatch, date) {
        dispatch({ type: types.SET_DATE_FILTER, payload: date });
    },
    clearFilters(dispatch) {
        dispatch({ type: types.CLEAR_FILTERS });
    },
    setNewServiceFormOpen(dispatch, boolean) {
        dispatch({ type: types.SET_NEW_SERVICE_FORM_OPEN, payload: boolean });
    },
    setNewServiceForm_02Open(dispatch, boolean) {
        dispatch({
            type: types.SET_NEW_SERVICE_FORM_02_OPEN,
            payload: boolean,
        });
    },
    setSlotEvent(dispatch, slotEvent) {
        dispatch({ type: types.SET_SLOT_EVENT, payload: slotEvent });
    },
    setNewJobCustomer(dispatch, customer) {
        dispatch({ type: types.SET_NEW_JOB_CUSTOMER, payload: customer });
        dispatch({ type: types.SET_NEW_SERVICE_FORM_OPEN, payload: false });
        dispatch({ type: types.SET_NEW_SERVICE_FORM_02_OPEN, payload: true });
    },
    async scheduleNewJob(dispatch, jobDetails) {
        let { slotEvent, customer, details } = jobDetails;
        let gapi = window.gapi;
        try {
            let newJobDocId;

            //Check if we need to create a new customer
            if (jobDetails.customer.docId !== '') {
                //If not, create the job with the customer ID
                let newJobDetails = jobModel.formatJob(jobDetails);
                newJobDocId = await jobService.scheduleNewJob(newJobDetails);

                if (!newJobDocId) {
                    throw new Error('Failed to create job record');
                }

                //Get the new Job ID and add it to the customer
                let updatedCustomer = await jobService.addJobToCustomer(
                    jobDetails.customer.docId,
                    newJobDocId
                );
            } else {
                //Create a new customer first
                let newCustomer = await customerActions.addCustomer(
                    dispatch,
                    customer
                );
                console.log('New Customer', newCustomer);

                //Replace the jobDetails customer with the new one
                jobDetails.customer = newCustomer;

                console.log(
                    'New Job Details with customer',
                    jobDetails.customer
                );
                //Now create the job
                let newJobDetails = jobModel.formatJob(jobDetails);
                console.log('New Job Details', newJobDetails);
                newJobDocId = await jobService.scheduleNewJob(newJobDetails);

                //Now add the job Id back to the customer
                await jobService.addJobToCustomer(
                    newCustomer.docId,
                    newJobDocId
                );
            }

            //Dispatch the new job created to the customer with the job
            dispatch({
                type: customerTypes.ADD_JOB_TO_CUSTOMER,
                payload: {
                    newJobDocId,
                    customerDocId: jobDetails.customer.docId,
                },
            });

            //format the jobDetails to be added to the bigCalendar
            let formattedBigCalEvent = jobModel.formatBigCalendarEvent({
                newJobDocId,
                ...jobDetails,
            });

            //Add job to global jobs
            dispatch({
                type: types.ADD_JOB_TO_JOBS,
                payload: formattedBigCalEvent,
            });

            //Add the created job to the calendar
            let formattedGoogleCalEvent = jobModel.formatGoogleCalendarEvent(
                jobDetails
            );
            await gapi.client.calendar.events.insert(formattedGoogleCalEvent);

            return true;
        } catch (error) {
            console.log('Scheduling Job Error: ', error);
            return error;
        }

        //If yes, create the customer first

        //Get the customer ID

        //Create the job and add the customer ID

        //Get the job ID and add back to the customer

        //If successful, add the event to their google calendar

        //then, update the global state of events that are upcoming

        //If successful, return true,

        //or return error
    },
};
