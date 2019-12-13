import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../state';
import moment from 'moment';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useTheme, makeStyles, styled } from '@material-ui/core/styles';
import {
    Tab,
    Tabs,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Grid,
    Box,
} from '@material-ui/core';

import PhotosPanel from './components/PhotosPanel';
import NotesPanel from './components/NotesPanel';
import LightBox from './components/LightBox';

const useStyles = makeStyles(theme => ({
    root: {
        marginLeft: theme.spacing(2),
        flexGrow: 1,
        width: '100%',
    },
}));

const Buttons = styled(Box)({});

const teams = techsArray => {
    let team = techsArray.reduce((acc, curr) => {
        return acc + curr.name + ' & ';
    }, 'Serviced By: ');

    //Remove the last & because I'm lazy
    return team.slice(0, -2);
};

const Job = ({ location, history }) => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [note, setNote] = useState('');
    const [{ customers }, dipatch] = useStateValue();
    const [job, setJob] = useState(null);
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        let index = customers.customerJobs.findIndex(job => {
            return job.docId == location.state;
        });
        let job = customers.customerJobs[index];
        setJob(job);
    }, [customers.customerJobs, location.state]);

    const handleChange = (e, newVal) => {
        setValue(newVal);
    };

    const handleNoteChange = e => {
        setNote(e.target.value);
    };

    const handleSubmit = () => {
        console.log('The submitted note is!: ', note);
    };

    return (
        <Grid container item className={classes.root} alignItems="stretch">
            {!job ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    {mobile && (
                        <IconButton onClick={() => history.goBack()}>
                            <ArrowBackIcon />
                            {customers.currentCustomer.name}
                        </IconButton>
                    )}
                    <Grid item>
                        <h2>
                            {moment(job.details.arrivalWindowStart).format(
                                'LL'
                            )}
                        </h2>
                        <p>Serviced By: Get this to work</p>
                        <Grid container>
                            <Grid item>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    scrollButtons="off"
                                >
                                    <Tab label="Photos" />
                                    <Tab label="Job Notes" />
                                </Tabs>
                            </Grid>
                            <Grid item>
                                {value == 0 ? (
                                    <LightBox />
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        fullWidth
                                        onClick={() => setOpen(true)}
                                    >
                                        Add Note
                                    </Button>
                                )}
                            </Grid>
                        </Grid>
                        <PhotosPanel value={value} index={0} job={job} />
                        <NotesPanel value={value} index={1} job={job} />
                        <Dialog open={open}>
                            <DialogContent>
                                <form>
                                    <input
                                        type="text"
                                        value={note}
                                        onChange={handleNoteChange}
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button onCLick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                    </Grid>
                </>
            )}
        </Grid>
    );
};

export default Job;
