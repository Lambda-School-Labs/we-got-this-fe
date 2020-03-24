import React, {useEffect, useState} from 'react';
import {Grid, Button, Select, MenuItem, FormControl} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import TechCard from './TechCard';
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
		justifyContent: 'space-between',
		margin: '20px',
		color: '#2678C0',
	},
	techs: {
		'& > *': {
			marginTop: '30px',
		},
	},

	filter: {
		display: 'flex',
		justifyContent: 'center',
		minWidth: '350px',
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
		justifyContent: 'center',
	},
	main: {
		padding: '10px',
		borderRadius: '5px',
	},
	profile: {
		width: '100%',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: '0px auto',
		marginBottom: '10px',
		background: 'whitesmoke',
		border: '1px solid #2877bf',
		color: '#2877bf',
		borderRadius: '3px',
	},
	header: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: '0px auto',
		marginBottom: '10px',
		background: 'whitesmoke',
		border: '1px solid #2877bf',
		color: '#2877bf',
		borderRadius: '3px',
		backgroundImage: `url(${'https://qph.fs.quoracdn.net/main-qimg-00b9dd8d87de34da9de0234aeb447b5f'})`,
		minHeight: '150px',
	},

	info: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	edit: {
		height: '20px',
		weight: '20px',
		marginRight: '15px',
	},
	profilePic: {
		height: '100px',
		width: '100px',
		borderRadius: '5px',
		border: '1px solid white',
		margin: '5px 25px',
	},
	admin: {
		fontWeight: 'bolder',
		fontSize: '16px',
		marginTop: '15px',
		marginBottom: '0',
		color: '#626262',
		textShadow: '3px 2px 2px white',
	},
	email: {
		color: '#2877bf',
		textShadow: '3px 2px 2px light grey',
		fontSize: '14px',
		marginTop: '0',
	},
	pickTeam: {
		margin: '0 auto',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
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
			<div className={classes.header}>
				<div>
					<h1 className={classes.title}>Technicians</h1>
				</div>

				<div className={classes.butns}>
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
			</div>
			<div className={classes.profile}>
				<div className={classes.main}>
					<EditTech
						open={editDialogData.open}
						isEditing={editDialogData.isEditing}
						loading={editDialogData.loading}
						handleChange={handleEditorChange}
						handleCancel={handleCancel}
						handleSave={handleSave}
						tech={editDialogData.tech}
					/>
					<Grid container spacing={6} className={classes.pickTeam}>
						<div className={classes.row}></div>
					</Grid>
					<FormControl>
						<Select
							className={classes.filter}
							value={filter}
							onChange={handleFilterChange}
						>
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
				<div className={classes.info}>
					<div>
						<img
							className={classes.profilePic}
							src='https://static.wixstatic.com/media/96e345_6604b08d98c64c4592edee1c680b76a8~mv2.jpg/v1/fill/w_430,h_584,al_c,q_80,usm_0.66_1.00_0.01/96e345_6604b08d98c64c4592edee1c680b76a8~mv2.webp'
						/>
					</div>
					<div>
						<h1 className={classes.admin}>
							{auth.currentUser && auth.currentUser.displayName}{' '}
						</h1>
						<p className={classes.email}>
							{auth.currentUser && auth.currentUser.email}
						</p>
					</div>
				</div>
				<div className={classes.butns}>
					<div className={classes.butns}>
						<Button
							color='secondary'
							onClick={() => {
								actions.logout(dispatch);
							}}
						>
							Sign Out
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Techs;
