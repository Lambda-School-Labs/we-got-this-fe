import React, {useState, useEffect} from 'react';
import {
	Toolbar,
	Tooltip,
	IconButton,
	Typography,
	Button,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';

import NewCustomerForm from '../../../components/forms/NewCustomerForm';
import DialogWrapper from '../../../components/dialogs/DialogWrapper';

const useStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
	},
	container: {
		display: 'flex',
		marginTop: '75px',
		flexDirection: 'row',
	},
	title: {
		marginLeft: '44px',
	},
}));

/*
    Displays a header for the table of customers.

    Example Props:
        "title": "Customers"
*/
const TableHeader = ({title}) => {
	const classes = useStyles();
	return (
		<div className={`${classes.container} ${classes.root}`}>
			<Typography variant='h6' className={classes.title}>
				{title}
			</Typography>
			{/* <Tooltip title="Filter">
                <IconButton onClick={() => alert('Clicked')}>
                    <FilterListIcon />
                </IconButton>
            </Tooltip> */}
			{/* <DialogWrapper
                trigger={click => (
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => click()}
                    >
                        New Customer
                    </Button>
                )}
                dialogContent={close => <NewCustomerForm handleClose={close} />}
                title="Create New Customer"
                size="sm"
            /> */}
		</div>
	);
};

export default TableHeader;
