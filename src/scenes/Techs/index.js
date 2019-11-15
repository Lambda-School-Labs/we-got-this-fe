import React from 'react';
import { Grid, Button, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TechCard from './TechCard';

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        '& *': {
            marginRight: theme.spacing(10),
        }
    },
}));

const Techs = ({ techs }) => {
    const classes = useStyles();

    techs = [
        {
            displayName: 'Sanny Sherief',
            photoUrl: 'https://i.imgur.com/l5YJgol.png',
        },
        {
            displayName: 'Sanny Sherief',
            photoUrl: 'https://i.imgur.com/l5YJgol.png',
        },
        {
            displayName: 'Sanny Sherief',
            photoUrl: 'https://i.imgur.com/l5YJgol.png',
        },
    ];

    return (
        <>
            <div className={classes.header}>
                <h1>Technicians</h1>
                <FormControl>
                    <InputLabel id="team">Team</InputLabel>
                    <Select value={3} displayEmpty>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained">New Tech</Button>
            </div>
            <Grid container xs={12} spacing={3} justify='space-between' >
                {
                    techs.map((tech, index) => {
                        return (
                            <Grid item sm={12} md={5} key={index}>
                                <TechCard {...tech} />
                            </Grid>
                        )
                    })
                }
            </Grid>
        </>
    );
};

export default Techs;