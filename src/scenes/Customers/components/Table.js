import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';
import { actions } from '../../../state/customer/customerActions';
import { useStateValue } from '../../../state';

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
    table: {
        minWidth: 650,
    },
    header: {
        '& th': {
            fontWeight: 600,
        },
    },
}));

const CustomerTable = ({ customers }) => {
    const [, dispatch] = useStateValue();
    const classes = useStyles();

    return (
        <>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>Customer Name</TableCell>
                        <TableCell align="right">First Service</TableCell>
                        <TableCell align="right">Next Service</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers.length &&
                        customers.map(customer => {
                            return (
                                <TableRow key={customer.name}>
                                    <TableCell component="th" scope="row">
                                        {/* <Link
                                            to={{
                                                pathname: `${routes.CUSTOMERS}/${customer.docId}`,
                                            }}
                                            //Set Current Customer from here
                                            //Can't use state on location because
                                            //otherwise the /customers/:customer_id
                                            //will reload and check location.state on /customers/:customer_id/:job_id
                                            onClick={() =>
                                                actions.setCurrentCustomer(
                                                    dispatch,
                                                    customer
                                                )
                                            }
                                        > */}
                                        {customer.name}
                                        {/* </Link> */}
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.firstServiceDate ||
                                            'No services'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.nextServiceDate ||
                                            'No service scheduled'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {customer.type || 'Unknown'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`${routes.CUSTOMERS}/${customer.docId}`}
                                            onClick={() => {
                                                actions.setCurrentCustomer(
                                                    dispatch,
                                                    customer
                                                );
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </>
    );
};

export default CustomerTable;
