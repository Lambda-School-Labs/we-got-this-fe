import React, {useState} from 'react';
import Firebase from '../../config/firebase';
import {useStateValue} from '../../state';
import {Button, Grid, Link} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {routes} from '../../constants/routes';
const storageRef = Firebase.getStorageRef();

const useStyles = makeStyles(theme => ({
	main: {
		width: '100%',
		borderRadius: '4px',
	},
	profile: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: '0px auto',
		background: 'whitesmoke',
		border: '1px solid #2877bf',
		borderRadius: '4px',
	},
	info: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginLeft: '15px',
	},
	edit: {
		height: '20px',
		weight: '20px',
		marginRight: '15px',
	},
	profilePic: {
		height: '125px',
		width: '125px',
		borderRadius: '5px',
		border: '1px solid white',
		margin: '5px 5px',
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
		fontSize: '20px',
		marginTop: '0',
	},
	button: {
		margin: '25px auto',
		height: '125px',
		width: '200px',
		opacity: '90%',
		fontSize: '20px',
	},
	btnLabel: {
		fontSize: '18px',
	},
	bigBtns: {
		margin: '25px auto',
		backgroundImage: `url(${'https://qph.fs.quoracdn.net/main-qimg-00b9dd8d87de34da9de0234aeb447b5f'})`,
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
	},

	title: {
		color: '#2877bf',
		textShadow: '3px 5px 10px white',
	},
}));

const Jobs = () => {
	const [files, setFiles] = useState(null);
	const [{auth}, dispatch] = useStateValue();
	const handleFiles = e => {
		setFiles(e.target.files);
	};
	const classes = useStyles();

	const handleUpload = () => {
		let uploadTask = storageRef.child('images/scott').put(files[0]);
		uploadTask.on(
			'state_changed',
			snapshot => {
				//progress
			},
			error => {
				//error handler
				console.log(error);
			},
			() => {
				uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
					console.log('The download URL is: ', downloadURL);
				});
			},
		);
	};

	return (
		<>
			<div className={classes.main}>
				<Grid className={classes.bigBtns}>
					<Button
						href={`${routes.TECHS}`}
						className={classes.button}
						variant='contained'
						color='primary'
					>
						<p className={classes.btnLabel}>TECHS & TEAMS</p>
					</Button>

					<Button
						href={`${routes.CUSTOMERS}`}
						className={classes.button}
						variant='contained'
						color='primary'
					>
						CUSTOMERS
					</Button>

					<Button
						href={`${routes.REGISTER_COMPANY}`}
						className={classes.button}
						variant='contained'
						color='primary'
					>
						COMPANIES
					</Button>

					<Button
						href={`${routes.PROFILE}`}
						className={classes.button}
						variant='contained'
						color='primary'
					>
						ADMINS
					</Button>
				</Grid>
			</div>
		</>
	);
};

export default Jobs;
