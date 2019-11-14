import React from 'react';
import { Card, Button, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',

        '& .photo': {
            maxWidth: '150px',
        }
    },

    info: {
        width: '100%',
        padding: theme.spacing(2),
        '& h2': {
            marginTop: '0',
        }
    },

    dropdown: {
        width: '100%',
    },

    controls: {
        width: '100%',
        textAlign: 'center',
        paddingTop: theme.spacing(2),
        '& *': {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        }
    },
}));

const TechCard = ({ displayName, photoUrl }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <img className="photo" src={photoUrl} alt={displayName} />
            <div className={classes.info}>
                <h2>{displayName}</h2>
                <FormControl className={classes.dropdown}>
                    <InputLabel id="team">Team</InputLabel>
                    <Select value={3} displayEmpty>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Team A</MenuItem>
                        <MenuItem value={20}>Team B</MenuItem>
                        <MenuItem value={30}>Team C</MenuItem>
                    </Select>
                </FormControl>
                <div className={classes.controls}>
                    <Button>Archive</Button>
                    <Button>Edit</Button>
                </div>
            </div>
        </Card>
    );
};

export default TechCard;