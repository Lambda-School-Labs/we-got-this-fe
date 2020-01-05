import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { routes } from '../../../constants/routes';
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
import moment from 'moment';

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
    header: {
        '& th': {
            fontWeight: 600,
        },
    },
}));

// TODO: Fix this in the schema first
const teams = techsArray => {
    let team = techsArray.reduce((acc, curr) => {
        return acc + curr.name + ' & ';
    }, 'Serviced By: ');

    //Remove the last & because I'm lazy
    return team.slice(0, -2);
};

/*
    Displays a specific customer's service history in a table format.

    Example Props:
        "jobs": [
            "Object"
        ],
        "match": {
            "path": "/customers/:customer_id",
            "url": "/customers/I0G0og0tcoa0KUlrzxPK",
            "isExact": true,
            "params": "Object"
        },
        "location": {
            "pathname": "/customers/I0G0og0tcoa0KUlrzxPK",
            "search": "",
            "hash": "",
            "key": "e58lws"
        }
*/
const ServiceTable = ({ jobs, match, location }) => {
    console.log(('Service Table Location: ', location));
    const classes = useStyles();

    return (
        <>
            <Table size="small">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell>Service Date</TableCell>
                        <TableCell align="right">Serviced By</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right"> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.length &&
                        jobs.map((job, i) => {
                            let scheduledDate = moment(job.end).format('LL');
                            return (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row">
                                        {scheduledDate}
                                    </TableCell>
                                    <TableCell align="right">
                                        'Need to fix'
                                    </TableCell>
                                    <TableCell align="right">
                                        {job.type || 'Unknown'}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            size="small"
                                            component={Link}
                                            to={{
                                                pathname: `${match.url}/${job.docId}`,
                                                state: job.docId,
                                            }}
                                        >
                                            Details
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

export default ServiceTable;
