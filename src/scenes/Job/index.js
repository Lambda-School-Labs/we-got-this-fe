import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { useStateValue } from '../../state';
import { Tab, Tabs } from '@material-ui/core';
import PhotosPanel from './components/PhotosPanel';
import NotesPanel from './components/NotesPanel';

const useStyles = makeStyles({
    column: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
});

const teams = techsArray => {
    let team = techsArray.reduce((acc, curr) => {
        return acc + curr.name + ' & ';
    }, 'Serviced By: ');

    //Remove the last & because I'm lazy
    return team.slice(0, -2);
};

const Job = ({ location }) => {
    const [value, setValue] = useState(0);
    const [{ customers }, dipatch] = useStateValue();
    const [job, setJob] = useState(null);
    const classes = useStyles();

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

    return (
        <>
            {!job ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <div className={classes.column}>
                        <h1>{job.details.schedule_date}</h1>
                        <p>{teams(job.techs)}</p>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            <Tab label="Photos" />
                            <Tab label="Notes" />
                        </Tabs>
                        <PhotosPanel value={value} index={0} />
                        <NotesPanel value={value} index={1} />
                    </div>
                </>
            )}
        </>
    );
};

export default Job;
