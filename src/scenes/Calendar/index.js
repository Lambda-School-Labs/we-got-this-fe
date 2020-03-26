import React, {useEffect, useMemo} from 'react';
import {Calendar, Views, momentLocalizer} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import moment from 'moment';
import {actions} from '../../state/jobs/jobsActions';
import {actions as logout} from '../../state/auth/authActions';
import {useStateValue, useService} from '../../state';
import teamService from '../../state/team/teamService';
import Profile from '../Profile';
import Jobs from '../Jobs';
import NewJob from '../../components/dialogs/NewJob';
import NewJob_02 from '../../components/dialogs/NewJob_02';

import Filters from './components/Filters';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	button: {
		display: 'flex',
		fontSize: '14px',
		margin: '10px auto',
		padding: '5px',
		width: '100%',
		textDecoration: 'none',
		backgroundColor: '#2877bf',
		color: 'white',
	},
}));

const AllCalendar = ({history}) => {
	//Get Google API
	const DraggableCalendar = withDragAndDrop(Calendar);
	const localizer = momentLocalizer(moment);
	const [{auth, jobs, teams}, dispatch] = useStateValue();
	const services = {team: useService(teamService, dispatch)};
	const classes = useStyles();
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
						auth.currentUser.roles.includes('admin') &&
						auth.currentUser.roles.includes('tech') &&
						!!job.details &&
						job.details.team !== null
					) {
						// return the team document which matches the teamFilter

						return jobs;
					}
					return true;
				})
				.filter(job => {
					if (
						!auth.currentUser.roles.includes('admin') &&
						!!job.details &&
						job.details.team !== null
					) {
						// return the team document which matches the teamFilter

						return job.details.team.users.includes(
							auth.currentUser.docRef,
						);
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
		if (!event.details || event.details.team == null)
			return {
				style: {
					backgroundColor: '#BDBDBD',
					border: 'none',
					opacity: '60%',
					borderRadius: '5px',
				},
			};
		//For events requested by filter
		else if (event.details.team.docId == jobs.teamFilter) {
			return {
				style: {
					backgroundColor: '#69C8FF',
					border: 'none',
					borderRadius: '5px',
					position: 'absolute',
					zIndex: '2',
				},
			};
		} else {
			//For events not requested by filter
			return {
				style: {
					backgroundColor: '#2877bf',
					border: 'none',
					opacity: '80%',
					borderRadius: '5px',
					position: 'absolute',
					zIndex: '1',
				},
			};
		}
	};

	return (
		<>
			{!auth.currentUser.roles.includes('admin') ? <Profile /> : null}
			{auth.currentUser.roles.includes('admin') ? <Jobs /> : null}
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
					auth.currentUser.roles.includes('admin')
						? Views.WORK_WEEK
						: Views.DAY
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
			<Button
				href={`${'https://calendar.google.com/calendar/r'}`}
				className={classes.button}
				variant='contained'
			>
				Modify Appointments
			</Button>

			<NewJob />
			<NewJob_02 />
			{!auth.currentUser.roles.includes('admin') ? null : <Profile />}
		</>
	);
};

export default AllCalendar;
