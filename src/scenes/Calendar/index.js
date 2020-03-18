import React, {useEffect, useMemo} from 'react';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment';
import {actions} from '../../state/jobs/jobsActions';
import {useStateValue, useService} from '../../state';
import teamService from '../../state/team/teamService';

import NewJob from '../../components/dialogs/NewJob';
import NewJob_02 from '../../components/dialogs/NewJob_02';

import Filters from './components/Filters';

const AllCalendar = ({history}) => {
	//Get Google API
	const DraggableCalendar = withDragAndDrop(Calendar);
	const localizer = momentLocalizer(moment);
	const [{auth, jobs, teams}, dispatch] = useStateValue();
	const services = {team: useService(teamService, dispatch)};

	let allViews = Object.keys(Views).map(k => Views[k]);

	//Get the calendar Events for this month + 2 more
	useEffect(() => {
		if (
			auth.currentUser &&
			auth.currentUser.docRef &&
			auth.calendarLoaded &&
			!jobs.calendarFetched
		) {
			console.log('Getting Calendar Events');
			//This is because there is a delay between gapi loading and the user being actually authenticated
			//I tried 500 & 1000 milliseconds, but it would still "require login at every 10th request"
			//at 1500 seconds I find no issues
			setTimeout(() => {
				actions.getAllCalendarEvents(dispatch);
			}, 2000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth.currentUser, auth.calendarLoaded]);

	//This is redundant and should be pulled elsewhere, but this is what I've got
	//Pull the teams so the filters can access it
	useEffect(() => {
		if (teams.teams.length == 0) {
			services.team.getAllTeams();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function openScheduleForm(event) {
		actions.setSlotEvent(dispatch, event);
		actions.setNewServiceFormOpen(dispatch, true);
	}

	//Memoized the the filters is only rerendered when the teamFilter changes
	let filters = useMemo(() => {
		console.log('jobs', jobs);
		//Team Filter

		return (
			jobs.jobs
				.filter(job => {
					if (
						jobs.teamFilter !== null &&
						!!job.details &&
						job.details.team !== null
					) {
						// return the team document which matches the teamFilter

						return jobs;
					}
					return true;
				})
				//Zipcode Filter
				.filter(job => {
					if (
						jobs.zipcodeFilter !== null &&
						jobs.zipcodeFilter != '' &&
						!!job.details &&
						job.details.team !== null
					) {
						return job.details.zipcode.includes(jobs.zipcodeFilter);
					}
					return true;
				})
		);
	}, [jobs.jobs, jobs.teamFilter, jobs.zipcodeFilter]);

	const Event = ({event}) => {
		return (
			<span>
				<strong>{event.title}</strong>
				<p>{event.details && event.details.teamName}</p>
				<p>{event.details && event.details.zipcode}</p>
				<p>{event.details && event.details.type}</p>
			</span>
		);
	};

	const formatEvent = (event, job) => {
		console.log(jobs);
		//For events that weren't created in the system
		if (!event.details || event.details.team == null)
			return {
				style: {
					backgroundColor: 'grey',
				},
			};
		//For events requested by filter
		else if (event.details.team.docId == jobs.teamFilter) {
			return {
				style: {
					backgroundColor: '',
				},
			};
		} else {
			//For events not requested by filter
			return {
				style: {
					backgroundColor: '#69C8FF',
				},
			};
		}
	};

	return (
		<>
			<Filters />
			{jobs.jobs.length == 0 ? (
				<p>Getting Events or there are no events</p>
			) : null}

			<DraggableCalendar
				selectable
				localizer={localizer}
				events={filters}
				views={[Views.MONTH, Views.WORK_WEEK, Views.DAY, Views.AGENDA]} 
					defaultView={
					(auth.currentUser.roles.includes('admin')) ? 
					Views.WORK_WEEK:
					Views.DAY
				}
				
				onSelectSlot={event => {
					openScheduleForm(event);
				}}
				min={new Date(2019, 11, 13, 8)}
				max={new Date(2019, 11, 13, 18)}
				onSelectEvent={event => {
					if (!!event.details) {
						history.push(
							`/customers/${event.details.customerId}/${event.details.jobId}`,
						);
					}
				}}
				eventPropGetter={formatEvent}
				components={{
					event: Event,
				}}
				style={{height: 500}}
				
			/>
			<NewJob />
			<NewJob_02 />
		</>
	);
};

export default AllCalendar;
