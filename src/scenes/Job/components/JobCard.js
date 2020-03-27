import React from 'react';
import {Grid, Paper, Typography, ButtonBase} from '@material-ui/core';
import {useTheme, styled, makeStyles} from '@material-ui/core/styles';
import moment from 'moment';
import ChecklistImage from './ChecklistImage';
import StopWatch from './StopWatch';
import CustomerCard from '../../Customer/components/CustomerCard';
import DialogWrapper from '../../../components/dialogs/DialogWrapper';

const Image = styled(({url, ...other}) => <ButtonBase {...other} />)({
	width: 128,
	height: 128,
	backgroundSize: 'cover',
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundImage: props =>
		props.url
			? `url(${props.url})`
			: 'url(https://www.chalktalksports.com/on/demandware.static/Sites-ChalkTalkSports-Site/-/default/dw552617e4/images/Placeholder.jpg)',
	display: 'flex',
	flexDirection: 'column',
});

const useStyles = makeStyles(theme => ({
	root: {
		margin: '0 auto',
		width: '90%',
	},
	tabs: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(4),
		width: '100%',
	},
	timer: {
		margin: '10px auto',
		fontSize: '40px',
		color: '#2678C0',
	},
}));

const JobCard = ({job}) => {
	const theme = useTheme();
	const classes = useStyles();
	return (
		<Grid component={Paper} container item>
			<Grid item>{/* <CustomerCard /> */}</Grid>
			{/* <Grid item>
				<DialogWrapper
					trigger={click => (
						<Image
							url={job.approved_checklist_url}
							onClick={() => click()}
						/>
					)}
					dialogContent={close => (
						<ChecklistImage
							img={job.approved_checklist_url}
							approved={true}
							handleClose={close}
						/>
					)}
					title='CheckList Photo'
					size='xs'
				/>
			</Grid> */}
			<Grid item style={{margin: theme.spacing(1)}}>
				<Typography variant='h6'>
					{moment(job.details.arrivalWindowEnd).format('LL')}
				</Typography>
				<p>Serviced By: {job.team.name}</p>
				<div className={classes.timer}>
					<StopWatch job={job} />
				</div>
			</Grid>
		</Grid>
	);
};

export default JobCard;
