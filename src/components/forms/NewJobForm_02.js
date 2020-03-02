import React, {useState, useEffect, useMemo} from 'react';
import {useStateValue, withState, useService} from '../../state';
import {styled, makeStyles, withTheme} from '@material-ui/core/styles';
import {
	Grid,
	Box,
	TextField,
	MenuItem,
	Paper,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography,
} from '@material-ui/core';
import {actions as customerActions} from '../../state/customer/customerActions';
import {actions as jobActions} from '../../state/jobs/jobsActions';
import {withFormik, Form, Formik} from 'formik';
import * as Yup from 'yup';
import teamService from '../../state/team/teamService';

import moment from 'moment';

import {createTimes, durations} from '../../constants/times';
import SplashLoading from '../loading/SplashLoading';

import MuiSingleSelectInput from '../formItems/MuiSingleSelectInput';

const SelectedBox = styled(withTheme(Paper))(props => ({
	padding: props.theme.spacing(1),
	margin: props.theme.spacing(1),
}));

const typeOptions = [
	{
		value: 'recurring',
		display: 'Recurring',
	},
	{
		value: 'groupon',
		display: 'Groupon',
	},
	{
		value: 'one-off',
		display: 'One-off',
	},
	{
		value: 'initialAssessment',
		display: 'Initial Assessment',
	},
];

const recurringOptions = [
	{
		value: 'RRULE:FREQ=DAILY;COUNT=52',
		display: 'Daily',
	},
	{
		value: 'RRULE:FREQ=WEEKLY;COUNT=52',
		display: 'Weekly',
	},
	{
		value: 'RRULE:FREQ=MONTHLY;COUNT=52',
		display: 'Monthly',
	},
	{
		value: 'RRULE:FREQ=YEARLY;COUNT=52',
		display: 'Yearly',
	},
];

let recurringStyles = {
	typeOptions: typeOptions.recurring ? 'line-through' : 'none',
};

const NewJobForm_02 = ({handleClose}) => {
	const [loading, setLoading] = useState(true);
	const [{jobs, teams}, dispatch] = useStateValue();
	const services = {team: useService(teamService, dispatch)};

	//
	//If the times haven't been generated yet, generate them based on the slot
	//on the calendar that has been selected
	let day = (jobs.newJob.slotEvent && jobs.newJob.slotEvent.start) || null;
	let times = useMemo(() => createTimes(day), [day]);

	//Create the box with the info about the selected time
	const formatSlotEvent = slotEvent => {
		//So it doesn't break on mount while slotEvent is being added to global
		if (!slotEvent.start) {
			return 'Loading...';
		}

		//Give me the date
		let date = moment(slotEvent.start).format('LL');

		//Give me the start time
		let startTime = moment(slotEvent.start);

		//Give me the end time
		let endTime = moment(slotEvent.end);

		//Check if a day was selected or the individual time slot was selected
		if (startTime == '12:00 AM' || endTime == '12:00 AM') {
		}
		return (
			<Box>
				<h4>Selected Slot</h4>
				<p>Date: {date}</p>
				<p>Start Time: {startTime.format('LT')}</p>
				<p>End Time: {endTime.format('LT')}</p>
			</Box>
		);
	};

	//Create the box with the customers details
	const formatCustomerData = customer => {
		//This is a customer that was selected
		if (customer.locations) {
			let {address} = customer.locations[0];
			let {city, state, street, zipcode} = address;

			return (
				<Box>
					<h4>Customer Info</h4>
					<p>Name: {customer.name}</p>
					<p>
						Address: {street}, {city}, {state} {zipcode}
					</p>
				</Box>
			);
		} else {
			//This is a new customer that is being added
			return (
				<Box>
					<h4>Customer Info</h4>
					<p>Name: {customer.name}</p>
					<p>
						Address: {customer.street}, {customer.city},{' '}
						{customer.region} {customer.zipcode}
					</p>
				</Box>
			);
		}
	};

	useEffect(
		() => {
			if (teams.teams.length == 0) {
				services.team.getAllTeams();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	//Memoized so that it's not re-run everytime the component re-renders
	const availableTeams = useMemo(() => {
		return teams.teams.filter(team => {
			const teamsJobs = jobs.jobs.filter(job => {
				if (job.details && job.details.team !== null) {
					return job.details.team.docId === team.docId;
				}
				return false;
			});

			return !teamsJobs.some(job =>
				moment(jobs.newJob.slotEvent.start).isBetween(
					job.start,
					moment(job.end),
					null,
					'[]',
				),
			);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jobs.jobs, jobs.newJob.slotEvent.start, teams.teams]);

	return (
		<>
			<DialogContent>
				<Grid container spacing={1}>
					{/* Dialog Header */}
					<Grid item xs={12}>
						<h2>Create New Job</h2>
						<SelectedBox>
							{formatSlotEvent(jobs.newJob.slotEvent)}
						</SelectedBox>
						<SelectedBox>
							{formatCustomerData(jobs.newJob.customer)}
						</SelectedBox>
					</Grid>
					<Grid item xs={12}>
						<Formik
							initialValues={{
								arrivalWindowStart:
									moment(jobs.newJob.slotEvent.start).format(
										'LLL',
									) || '',
								arrivalWindowEnd:
									moment(jobs.newJob.slotEvent.end).format(
										'LLL',
									) || '',
								duration: '',
								cleaningType: '',
								team: '',
							}}
							validationSchema={Yup.object().shape({
								arrivalWindowStart: Yup.string().required(),
								arrivalWindowEnd: Yup.string().required(),
								team: Yup.string().required(),
							})}
							onSubmit={async (
								values,
								{setSubmitting, resetForm},
							) => {
								setSubmitting(true);
								let res = await jobActions.scheduleNewJob(
									dispatch,
									{
										...jobs.newJob,
										details: values,
										team: {
											docId: values.team,
											...teams.teams.find(
												team =>
													team.docId === values.team,
											),
										},
									},
								);
								if (res === true) {
									setSubmitting(false);
									handleClose();
								}
							}}
						>
							{formik => {
								return (
									<>
										{formik.isSubmitting ? (
											<SplashLoading />
										) : (
											<Form>
												<Grid container spacing={1}>
													<Grid item xs={12}>
														<h3>
															Select Job Details
														</h3>
													</Grid>
													<Grid item xs={6}>
														<MuiSingleSelectInput
															name='arrivalWindowStart'
															label='Arrival Window Start'
															data={times}
															valueKey='hour'
														/>
													</Grid>
													<Grid item xs={6}>
														<MuiSingleSelectInput
															name='arrivalWindowEnd'
															label='Arrival Window End'
															data={times}
															valueKey='hour'
														/>
													</Grid>
													<Grid item xs={6}>
														<MuiSingleSelectInput
															name='duration'
															label='Duration'
															data={durations}
														/>
													</Grid>
													<Grid item xs={6}>
														<MuiSingleSelectInput
															name='cleaningType'
															label='Cleaning Type'
															data={typeOptions}
														/>
													</Grid>
													<Grid item xs={6}>
														<MuiSingleSelectInput
															name='team'
															label='Team Assignment'
															data={
																availableTeams
															}
															displayKey='name'
															valueKey='docId'
														/>
													</Grid>
													{formik.values
														.cleaningType ===
													'recurring' ? (
														<Grid
															style={
																recurringStyles
															}
															item
															xs={6}
														>
															<MuiSingleSelectInput
																className='recurring'
																name='recurringType'
																label='Recurring'
																data={
																	recurringOptions
																}
															/>
														</Grid>
													) : null}
												</Grid>
												<Button
													type='submit'
													variant='contained'
													color='primary'
													style={{
														marginTop: 20,
														float: 'right',
													}}
												>
													Schedule Job
												</Button>
											</Form>
										)}
									</>
								);
							}}
						</Formik>
					</Grid>
				</Grid>
			</DialogContent>
		</>
	);
};

export default NewJobForm_02;
