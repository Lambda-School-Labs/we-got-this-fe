import { service as jobService } from './jobsService';
import { actions as customerActions } from '../customer/customerActions';

import jobModel from '../models/job';
import { types as customerTypes } from '../customer/customerActions';

import moment from 'moment';

export const types = {
    SET_DATE_FILTER: 'jobs/set_date_filter',
    SET_ZIP_FILTER: 'jobs/set_zip_filter',
    SET_TEAM_FILTER: 'jobs/set_team_filter',
    CLEAR_FILTERS: 'jobs/clear_filters',
    SET_NEW_SERVICE_FORM_OPEN: 'jobs/set_new_service_form_open',
    SET_NEW_SERVICE_FORM_02_OPEN: 'jobs/set_new_service_form_02_open',
    SET_NEW_JOB_CUSTOMER: 'jobs/set_new_job_customer',
    SET_SLOT_EVENT: 'jobs/set_slot_event',
    GET_ALL_JOBS: 'calendar/get_all_jobs',
    ADD_JOB_TO_JOBS: 'jobs/add_job_to_jobs',
    ADD_UPDATE_PHOTO_ON_JOB: 'jobs/add_update_photo_on_job',
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
        dispatch({
            type: types.SET_NEW_SERVICE_FORM_OPEN,
            payload: boolean,
        });
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
        dispatch({
            type: types.SET_NEW_JOB_CUSTOMER,
            payload: customer,
        });
        dispatch({
            type: types.SET_NEW_SERVICE_FORM_OPEN,
            payload: false,
        });
        dispatch({
            type: types.SET_NEW_SERVICE_FORM_02_OPEN,
            payload: true,
        });
    },

    async getAllCalendarEvents(dispatch) {
        let gapi = window.gapi;
        async function getCalendars() {
            let calendarList = await gapi.client.calendar.calendarList.list({
                maxResults: 10,
            });
            return calendarList.result.items;
        }
        async function getCalendarEvents(calendarId) {
            //Set dates
            let currentMonth = moment([moment().year(), moment().month(), 1]);
            let currentISOMonth = currentMonth.toISOString();
            let twoMonthLookAhead = currentMonth.add(3, 'months').toISOString();

            //Get calendar Events
            const calendar = await gapi.client.calendar.events.list({
                calendarId: calendarId,
                timeMin: currentISOMonth,
                timeMax: twoMonthLookAhead,
                showDeleted: false,
                singleEvents: true,
                orderBy: 'startTime',
            });

            return calendar.result.items;
        }

        let promises = [];

        let calendars = await getCalendars();
        calendars.forEach(calendar => {
            let { accessRole } = calendar;
            if (accessRole == 'owner' || accessRole == 'writer') {
                promises.push(getCalendarEvents(calendar.id));
            }
        });

        let allCalEvents = await Promise.all(promises);

        

        let flattened = allCalEvents.flat();

        

        let formatted = flattened.map(event =>
            jobModel.formatBigCalendarEvent(event)
        );

        dispatch({
            type: types.GET_ALL_JOBS,
            payload: formatted,
        });

        
    },

    async getAllJobs(dispatch) {
        try {
            let jobs = await jobService.getAllJobs();

            dispatch({
                type: types.GET_ALL_JOBS,
                payload: jobs,
            });
        } catch (err) {
            
        }
    },

    async scheduleNewJob(dispatch, jobDetails) {
        let { slotEvent, customer, details, team } = jobDetails;
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
                

                //Replace the jobDetails customer with the new one
                jobDetails.customer = newCustomer;

                console.log(
                    'New Job Details with customer',
                    jobDetails.customer
                );
                //Now create the job
                let newJobDetails = jobModel.formatJob(jobDetails);
                
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
            let formattedGoogleCalEvent = jobModel.formatGoogleCalendarEvent({
                newJobDocId,
                ...jobDetails,
            });
            await gapi.client.calendar.events.insert(formattedGoogleCalEvent);

            return true;
        } catch (error) {
            
            return error;
        }
    },
    async uploadJobImage(dispatch, values) {
        try {
            let formatted = jobModel.formatJobImage(values);
            let savedJob = await jobService.uploadJobImage(formatted);

            //Write Dispatch function here
            dispatch({
                type: customerTypes.ADD_IMAGE_TO_JOB,
                payload: formatted,
            });

            return true;
        } catch (err) {
            
            return err;
        }
    },
    async updateJobImage(dispatch, values) {
        try {
            let formatted = jobModel.formatJobImage(values);
            await jobService.updateJobImage(values);

            dispatch({
                type: customerTypes.UPDATE_IMAGE_ON_JOB,
                payload: formatted,
            });
            return true;
        } catch (err) {
            return err;
            
        }
    },
    async deleteJobImage(dispatch, values) {
        try {
            let formatted = jobModel.formatJobImage(values);
            console.log({values, formatted})
            await jobService.updateJobImage(formatted);

            dispatch({
                type: customerTypes.DELETE_IMAGE_ON_JOB,
                payload: formatted,
            });
            return true;
        } catch (err) {
            return err;
            
        }
    },
    async saveChecklistToJob(dispatch, jobId, downloadURL) {
        try {
            await jobService.saveChecklistToJob(jobId, downloadURL);

            dispatch({
                type: customerTypes.UPLOAD_UPDATE_CHECKLIST,
                payload: { jobId, downloadURL },
            });
        } catch (err) {
            
        }
    },
};
