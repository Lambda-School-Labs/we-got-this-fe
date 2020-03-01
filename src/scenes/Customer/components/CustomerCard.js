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

//State
import {useStateValue} from '../../../state';
import {actions} from '../../../state/customer/customerActions';

const useStyles = makeStyles(theme => ({
	root: {
		// width: '40%',
		// margin: theme.spacing(1),
	},
}));

const Title = styled(Box)({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	alignItems: 'center',
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
            "notes": "What a beautiful woman!",
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
		<Grid component={Paper} container item>
			<Grid item>
				<CustomerImage
					img={customer.img}
					//    https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg?)'
				/>
			</Grid>
			<CustomerDetails item>
				<Title>
					<Typography variant='h6'>{customer.name}</Typography>
					<DialogWrapper
						trigger={click => (
							<IconButton size='small' onClick={() => click()}>
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
				<p>{fullAddress}</p>
				<p>{customer.contact.phone}</p>
			</CustomerDetails>
		</Grid>
	);
};

export default CustomerCard;
