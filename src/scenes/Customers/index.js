import React, {useState, useEffect} from 'react';
import {
	Table,
	Toolbar,
	Tooltip,
	IconButton,
	Typography,
	FormControl,
	Select,
	MenuItem,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import CustomerTable from './components/Table';
import Profile from '../Profile';
import {useStateValue} from '../../state';
import {actions} from '../../state/customer/customerActions';
import CustomerTableHeader from './components/TableHeader';

const useStyles = makeStyles(theme => ({
	flex: {
		display: 'flex',
		marginLeft: '63px',
	},

	header: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: '0px auto',
		background: 'whitesmoke',
		color: '#2877bf',
		backgroundImage: `url(${'https://qph.fs.quoracdn.net/main-qimg-00b9dd8d87de34da9de0234aeb447b5f'})`,
		borderRadius: '4px',
		minHeight: '175px',
		textShadow: '1px 1px 1px white',
	},

	margin: {
		marginLeft: '175px',
		marginBottom: '15px',
		width: '163px',
	},
	main: {
		padding: '5px',
		borderRadius: '5px',
		boxShadow: '.5px 1px 2px 1px #D8D8D8',
		marginBottom: '20px',
	},
	heading: {
		margin: '10px 10px',
		// color: '#2678C0',
	},
}));

const Customers = () => {
	const [loading, setLoading] = useState(true);
	const [{customers}, dispatch] = useStateValue();
	const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('name');
	const classes = useStyles();

	useEffect(() => {
		//Check if the customers in State is there
		if (customers.customers.length == 0) {
			console.log('asking for customers');
			actions.getCustomers(dispatch).then(res => {
				if (res) setLoading(false);
			});
		} else {
			setLoading(false);
		}
	}, [customers.customers.length, dispatch]);

	const handleRequestSort = (event, property) => {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	};

	return (
		<>
			<div className={classes.main}>
				<h1 className={classes.heading}>Customers</h1>
				{loading ? (
					<h2>Loading...</h2>
				) : (
					<CustomerTable
						customers={customers.customers}
						onRequestSort={handleRequestSort}
						orderBy={orderBy}
						order={order}
					/>
				)}{' '}
			</div>
			<Profile />
		</>
	);
};

export default Customers;
