import React from 'react';
import { Grid, Paper, Typography, ButtonBase } from '@material-ui/core';
import { useTheme, styled } from '@material-ui/core/styles';
import moment from 'moment';
import ChecklistImage from './ChecklistImage';

import DialogWrapper from '../../../components/dialogs/DialogWrapper';

const Image = styled(({ url, ...other }) => <ButtonBase {...other} />)({
    width: 128,
    height: 128,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundImage: props =>
        props.url
            ? `url(${props.url})`
            : 'url(https://www.chalktalksports.com/on/demandware.static/Sites-ChalkTalkSports-Site/-/default/dw552617e4/images/Placeholder.jpg)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
});

const JobCard = ({ job }) => {
    const theme = useTheme();

    return (
        <Grid component={Paper} container item>
            <Grid item>
                <DialogWrapper
                    trigger={click => (
                        <Image
                            url={job.approved_checklist_url}
                            onClick={() => click()}
                        />
                    )}
                    dialogContent={close => (
                        <ChecklistImage
                            img={job.approved_checklist_url}
                            approved={true}
                            handleClose={close}
                        />
                    )}
                    title="CheckList Photo"
                    size="xs"
                />
            </Grid>
            <Grid item style={{ margin: theme.spacing(1) }}>
                <Typography variant="h6">
                    {moment(job.details.arrivalWindowStart).format('LL')}
                </Typography>
                <p>Serviced By: Get this to work</p>
            </Grid>
        </Grid>
    );
};

export default JobCard;
