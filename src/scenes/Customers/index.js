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
	Button,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import CustomerTable from './components/Table';
import Profile from '../Profile';
import Jobs from '../Jobs';
import {useStateValue} from '../../state';
import {actions} from '../../state/customer/customerActions';
import CustomerTableHeader from './components/TableHeader';

const useStyles = makeStyles(theme => ({
	butns: {
		display: 'flex',
		justifyContent: 'flex-end',
		margin: '20px',
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
		boxShadow: '.5px 1px 2px 1px #D8D8D8',
		marginBottom: '20px',
	},
	title: {
		margin: '25px',
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
			<div className={classes.main}>{/* <Jobs /> */}</div>
			<div className={classes.main}>
				<div className={classes.row}>
					<h1 className={classes.title}>Customers</h1>

					<div className={classes.butns}>
						<Button
							className={classes.button}
							variant='contained'
							color='primary'
						>
							New Customer
						</Button>
					</div>
				</div>
			</div>
			{loading ? (
				<h2>Loading...</h2>
			) : (
				<div className={classes.main}>
					<CustomerTable
						customers={customers.customers}
						onRequestSort={handleRequestSort}
						orderBy={orderBy}
						order={order}
					/>
				</div>
			)}{' '}
			<Profile />
		</>
	);
};

export default Customers;
