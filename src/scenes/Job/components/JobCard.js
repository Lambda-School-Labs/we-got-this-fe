import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import ChecklistImage from './ChecklistImage';

const JobCard = ({ job }) => {
    return (
        <Grid component={Paper} container item>
            <Grid item>
                <ChecklistImage
                    img={job.approved_checklist_url}
                    approved={true}
                />
            </Grid>
            <Grid item>
                <Typography variant="h6">
                    {moment(job.details.arrivalWindowStart).format('LL')}
                </Typography>
                <p>Serviced By: Get this to work</p>
            </Grid>
        </Grid>
    );
};

export default JobCard;
