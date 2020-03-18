import React from 'react';

//Components
import { Paper, Typography, Grid } from '@material-ui/core';

//Styling
import { makeStyles } from '@material-ui/core/styles';

/*
    Displays extra information about a customer and their needs,
    circumstances, requirements, etc.

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
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(1),
    },
}));

const CustomerNotes = ({ customer }) => {
    const classes = useStyles();
    return (
        <div className="CustomerNotes">
        <Grid
            component={Paper}
            item
            className={classes.root}
            justify="space-between"
        >
            <Typography variant="h6">Customer Notes</Typography>
            {customer.notes || 'No notes yet'}
        </Grid>
        </div>
    );
};

export default CustomerNotes;
