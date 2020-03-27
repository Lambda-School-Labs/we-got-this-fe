import React from 'react';
import techService from '../../state/tech/techService';
import {useService} from '../../state';
import {Card, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {useStateValue} from '../../state';
import PlaceholderPerson from '../../images/placeholderPerson.png';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		width: '300px',
		height: '120px',
		background: props => props.disabled && '#dcdbdb',
		backgroundColor: '#FFFFFF',
		borderRadius: '3px',
		boxShadow: '1px 1px 1px 1px #D8D8D8',
		'& *': {
			margin: '0',
			padding: '0',
		},

		'& button': {
			paddingRight: theme.spacing(1),
			color: '#2678C0',
			fontSize: '14px',
			color: 'grey',
		},

		'& .photo': {
			position: 'absolute',
			left: 0,
			right: 0,
			top: '50%',
			transform: 'translateY(-50%)',
			width: '100%',
			height: 'auto',
			borderRadius: '4px 0px 0px 4px',
		},
	},
	main: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '10px auto',
		color: '#2678C0',
	},

	photoWrapper: {
		position: 'relative',
		width: '120px',
		height: '120px',
		overflow: 'hidden',
	},

	info: {
		display: 'flex',
		flexDirection: 'column',
		margin: '10px',
		minWidth: '160px',
		color: '#2678C0',
	},

	controls: {
		display: 'flex',
		width: '100%',
		fontSize: '14px',
		color: 'grey',
		textAlign: 'center',
		paddingTop: theme.spacing(1),
	},
}));

/*
  Displays information about a specific tech.
  Example Props:
      "handleEdit": "handleEdit()",
      "docId": "mljjtLxunQHGiyGymRmt",
      "team": {
          "docId": "gYoobfPzHpk4CYfp3f88",
          "name": "Clean Team",
          "users": "Array[3]"
      },
      "disabled": true,
      "displayName": "Tester McGee",
      "email": "testermcgee@gmail.com",
      "phone": {
          "primary": "(555) 555-5555"
      },
      "photoUrl": "https://example.com",
      "role": [
          "tech"
      ],
      "roles": [
          "tech"
      ]
*/
const TechCard = ({
	docId,
	displayName,
	photoUrl,
	disabled,
	team,
	handleEdit,
}) => {
	const classes = useStyles({disabled});
	const [, dispatch] = useStateValue();
	const service = useService(techService, dispatch);

	const handleArchive = () => service.setTechDisabled(docId, !disabled);

	return (
		<div className={classes.main}>
			<div className={classes.root}>
				<div className={classes.photoWrapper}>
					<img
						className='photo'
						src={photoUrl || PlaceholderPerson}
						alt={displayName}
					/>
				</div>
				<div className={classes.info}>
					<h3>{displayName}</h3>
					<p>{team && team.name}</p>
					<div className={classes.controls}>
						<Button
							className={classes.button}
							onClick={handleArchive}
						>
							{disabled ? 'Activate' : 'Archive'}
						</Button>
						<Button
							className={classes.button}
							onClick={() => handleEdit(docId)}
							disabled={disabled}
						>
							Edit
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TechCard;
