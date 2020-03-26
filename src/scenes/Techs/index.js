import React, {useEffect, useState} from 'react';
import {Grid, Button, Select, MenuItem, FormControl} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TechCard from './TechCard';
import Profile from '../Profile';
import {useStateValue} from '../../state';
import teamService from '../../state/team/teamService';
import {actions} from '../../state/auth/authActions';
import {useService} from '../../state';
import techService from '../../state/tech/techService';
import EditTech from '../../components/dialogs/EditTech';
import SplashLoading from '../../components/loading/SplashLoading';

const useStyles = makeStyles(theme => ({
	butns: {
		display: 'flex',
		justifyContent: 'flex-end',
		margin: '20px',
		color: '#2678C0',
	},
	techs: {
		'& > *': {
			marginTop: '30px',
			display: 'flex',
			flexWrap: 'wrap',
			flexDirection: 'row',
			justifyContent: 'space-between',
			margin: '0px auto',
			marginBottom: '20px',
		},
	},

	filter: {
		margin: '20px 50px',
		width: '90%',
		color: '#2678C0',
	},

	button: {
		margin: '5px',
		backgroundColor: '#2678C0',
		fontSize: '12px',
		padding: '5px',
		width: '120px',
		borderRadius: '4px',
		color: 'white',
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	main: {
		padding: '3px',
		borderRadius: '5px',
		boxShadow: '.5px 1px 3px 1px #D8D8D8',
		marginBottom: '20px',
	},

	edit: {
		height: '20px',
		weight: '20px',
		marginRight: '15px',
	},

	title: {
		margin: '25px',
	},
}));

const filters = {
	all: () => true,
	active: tech => !tech.disabled,
	disabled: tech => tech.disabled,
};

const Techs = ({history}) => {
	const classes = useStyles();
	const [{techs, auth}, dispatch] = useStateValue();
	const services = {
		tech: useService(techService, dispatch),
		team: useService(teamService, dispatch),
	};
	const [filter, setFilter] = useState('all');
	const [loading, setLoading] = useState(true);

	const [editDialogData, setEditDialogData] = useState({open: false});
	const handleCancel = () =>
		setEditDialogData({...editDialogData, open: false, loading: false});
	const handleSave = async () => {
		const saveFunction = editDialogData.isEditing
			? services.tech.updateTech
			: services.tech.createTech;

		setEditDialogData({...editDialogData, loading: true});
		await saveFunction(editDialogData.tech);
		handleCancel();
	};

	const handleFilterChange = e => setFilter(e.target.value);

	const handleNewTech = () => {
		setEditDialogData({
			...editDialogData,
			isEditing: false,
			open: true,
			tech: {},
		});
	};

	const handleEdit = techId => {
		const {
			displayName,
			email,
			photoUrl,
			team: {docId: teamId} = {},
		} = techs.techs.find(tech => tech.docId === techId);

		setEditDialogData({
			...editDialogData,
			open: true,
			isEditing: true,
			tech: {displayName, email, photoUrl, teamId, docId: techId},
		});
	};

	const handleEditorChange = e =>
		setEditDialogData({
			...editDialogData,
			tech: {
				...editDialogData.tech,
				[e.target.name]: e.target.files
					? e.target.files[0]
					: e.target.value,
			},
		});

	useEffect(() => {
		(async () => {
			await services.team.getAllTeams();
			await services.tech.getAllTechs();
			setLoading(false);
		})();
	}, []);

	return loading ? (
		<SplashLoading height='25%' width='25%' />
	) : (
		<>
			<div className={classes.main}>
				<div className={classes.row}>
					<h1 className={classes.title}>Technicians</h1>

					<div className={classes.butns}>
						<Button
							className={classes.button}
							variant='contained'
							color='primary'
							onClick={handleNewTech}
						>
							New Tech
						</Button>
						<Button
							className={classes.button}
							variant='contained'
							color='primary'
							onClick={handleNewTech}
						>
							New Team
						</Button>
					</div>
				</div>
				<div>
					<EditTech
						open={editDialogData.open}
						isEditing={editDialogData.isEditing}
						loading={editDialogData.loading}
						handleChange={handleEditorChange}
						handleCancel={handleCancel}
						handleSave={handleSave}
						tech={editDialogData.tech}
					/>
					{/* <Grid container spacing={6} className={classes.pickTeam}>
                       <div className={classes.row}></div>
                   </Grid> */}
				</div>
			</div>
			<div className={classes.main}>
				<div>
					<FormControl className={classes.filter}>
						<Select value={filter} onChange={handleFilterChange}>
							<MenuItem value='all'>All</MenuItem>
							<MenuItem value='active'>Active</MenuItem>
							<MenuItem value='disabled'>Archived</MenuItem>
						</Select>
					</FormControl>
				</div>
				<Grid
					container
					className={classes.techs}
					justify='space-between'
				>
					{techs &&
						techs.techs &&
						techs.techs
							.filter(tech => filters[filter](tech))
							.sort((a, b) => {
								if (a.disabled && !b.disabled) return 1;
								if (a.disabled && b.disabled) return 0;

								return -1;
							})
							.map((tech, index) => {
								return (
									<Grid
										item
										xs={12}
										sm={6}
										md={4}
										key={index}
									>
										<TechCard
											handleEdit={handleEdit}
											{...tech}
										/>
									</Grid>
								);
							})}
				</Grid>
			</div>
			<Profile />
		</>
	);
};

export default Techs;
