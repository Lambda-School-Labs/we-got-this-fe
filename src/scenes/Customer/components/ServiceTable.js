import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link, Route} from 'react-router-dom';
import {routes} from '../../../constants/routes';
import Job from '../../Job';
import {
	Toolbar,
	Tooltip,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	Button,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
	},
	paper: {
		marginTop: theme.spacing(3),
		width: '100%',
		overflowX: 'auto',
		marginBottom: theme.spacing(2),
	},
	header: {
		'& th': {
			fontWeight: 600,
		},
	},
	fu: {
		width: '1200px',
	},
	fu2: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
}));

// TODO: Fix this in the schema first
const teams = techsArray => {
	let team = techsArray.reduce((acc, curr) => {
		return acc + curr.name + ' & ';
	}, 'Serviced By: ');

	//Remove the last & because I'm lazy
	return team.slice(0, -2);
};

/*
    Displays a specific customer's service history in a table format.

    Example Props:
        "jobs": [
            "Object"
        ],
        "match": {
            "path": "/customers/:customer_id",
            "url": "/customers/I0G0og0tcoa0KUlrzxPK",
            "isExact": true,
            "params": "Object"
        },
        "location": {
            "pathname": "/customers/I0G0og0tcoa0KUlrzxPK",
            "search": "",
            "hash": "",
            "key": "e58lws"
        }
*/
const ServiceTable = ({jobs, match, location}) => {
	console.log(('Service Table Location: ', location));
	const classes = useStyles();
	// const mobile = useMediaQuery(theme.breakpoints.down('sm'));
	const theme = useTheme();

	return (
		<>
			<Table size='small'>
				<TableBody>
					<TableHead>
						<TableCell>Service Date</TableCell>
						<TableCell align='right'>Serviced By</TableCell>
						<TableCell align='right'>Type</TableCell>
						<TableCell align='right'> </TableCell>
					</TableHead>

					{jobs.length &&
						jobs.map((job, i) => {
							let scheduledDate = moment(
								job.details.arrivalWindowStart,
							).format('LL');
							return (
								<ExpansionPanel className={classes.fu}>
									<TableRow key={i}>
										<TableCell component='th' scope='row'>
											{scheduledDate}
										</TableCell>
										<TableCell align='right'>
											{job.team.name}
										</TableCell>
										<TableCell align='right'>
											{job.type || 'Unknown'}
										</TableCell>
										<TableCell align='right'>
											<ExpansionPanelSummary
												expandIcon={
													<Button
														variant='outlined'
														color='primary'
														size='small'
														component={Link}
														to={{
															pathname: `${match.url}/${job.docId}`,
															state: job.docId,
														}}
													>
														Details
													</Button>
												}
												aria-controls='panel1a-content'
												id='panel1a-header'
											></ExpansionPanelSummary>
										</TableCell>
									</TableRow>

									<Typography className={classes.heading}>
										<Route
											path={routes.JOB_DETAILS}
											component={Job}
										/>
									</Typography>
								</ExpansionPanel>
							);
						})}
				</TableBody>
			</Table>
		</>
	);
};

export default ServiceTable;
