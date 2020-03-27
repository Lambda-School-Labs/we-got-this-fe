import React, {useState, useEffect, useRef} from 'react';

//Components
import EditCustomerForm from '../../../components/forms/EditCustomerForm';
import DialogWrapper from '../../../components/dialogs/DialogWrapper';
import CustomerImage from './CustomerImage';
import {
	Grid,
	IconButton,
	Box,
	makeStyles,
	Typography,
	Paper,
} from '@material-ui/core';

//styles
import {styled, withTheme} from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
// import './style.css';

//State
import {useStateValue} from '../../../state';
import {actions} from '../../../state/customer/customerActions';

const useStyles = makeStyles(theme => ({
	root: {
		// width: '100%',
	},
	// name: {
	// 	color: '#2877bf',
	// },
}));

const Title = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	alignItems: 'center',
});

const MediaFlex = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
});

const CustomerDetails = styled(withTheme(Grid))(props => ({
	margin: props.theme.spacing(1),
}));

/*
    Displays information about a specific customer.

    Example Props:
        "customer": {
            "docId": "I0G0og0tcoa0KUlrzxPK",
            "contact": "Object",
            "hearabout": null,
            "jobs": "Array[1]",
            "locations": "Array[1]",
            "name": "Zoe",
            "notes": "What a beautiful house!",
            "payment": null,
            "paymentAmount": null,
            "schedule": null
        }
*/
const CustomerCard = ({customer}) => {
	const classes = useStyles();
	const [, dispatch] = useStateValue();

	useEffect(() => {
		if (!customer.img) {
			actions.getCustomerImage(dispatch, customer.docId);
		}
	}, [customer.docId, customer.img, dispatch]);

	let {address} = customer.locations && customer.locations[0];
	let fullAddress =
		address &&
		`${address.street} ${address.city}, ${address.state} ${address.zipcode}`;

	return (
		<div className='customerDetails'>
			<Grid component={Paper} container item>
				<div>
					<Grid item className='Image'>
						<CustomerImage
							className='ImageSize'
							img={customer.img}
							//    https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?)'
						/>
					</Grid>
				</div>
				<div>
					<CustomerDetails item>
						<Title>
							<Typography
								// className={classes.name}
								variant='h6'
							>
								{customer.name}
							</Typography>
							<DialogWrapper
								trigger={click => (
									<IconButton
										// className={classes.name}
										size='small'
										onClick={() => click()}
									>
										<EditIcon />
									</IconButton>
								)}
								dialogContent={close => (
									<EditCustomerForm handleClose={close} />
								)}
								title='Edit Customer'
								size='sm'
							/>
						</Title>
						<strong>Address:</strong>{' '}
						<Typography variant='body2'>{fullAddress}</Typography>
						<strong>Phone:</strong>{' '}
						<Typography variant='body2'>
							{customer.contact.phone}
						</Typography>
						<strong>Email:</strong>{' '}
						<Typography
							variant='body2'
							// className={classes.name}
						>
							{customer.contact.email}
						</Typography>
						<strong>Payment Type:</strong>{' '}
						<Typography variant='body2'>
							{customer.payment}
						</Typography>
						<strong>How did they hear about us?</strong>{' '}
						<Typography variant='body2'>
							{customer.hearabout}
						</Typography>
					</CustomerDetails>
				</div>
			</Grid>
		</div>
	);
};

export default CustomerCard;
