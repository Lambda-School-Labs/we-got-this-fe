import React, { useState , useEffect } from 'react';
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
import { actions } from '../../../state/auth/authActions';

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

const UserTable = ({ users }) => {
    const [, dispatch] = useStateValue();
    const classes = useStyles();
    

    return (
        <>
            <Table className={classes.table} size="small">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>User List</TableCell>
                        <TableCell align="right">Admin</TableCell>
                        <TableCell align="right">Email</TableCell>
                        {/* <TableCell align="right">Type</TableCell> */}
                        <TableCell> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.length &&
                        users.map(user => {
                            return (
                                <TableRow key={user.name}>
                                    <TableCell component="th" scope="row">
                                        <Link
                                            to={{
                                                pathname: `${routes.USERS}/${user.docId}`,
                                            }}
                                            //Set Current Customer from here
                                            //Can't use state on location because
                                            //otherwise the /customers/:customer_id
                                            //will reload and check location.state on /customers/:customer_id/:job_id
                                            onClick={() =>
                                                actions.setCurrentUser(
                                                    dispatch,
                                                    user
                                                )
                                            }
                                        >
                                            {user.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.name ||
                                            'No name provided'}
                                    </TableCell>
                                    <TableCell align="right">
                                        {user.email ||
                                            'No email included'}
                                    </TableCell>
                                    {/* <TableCell align="right">
                                        {customer.type || 'Unknown'}
                                    </TableCell> */}
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Schedule
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

export default UserTable;
