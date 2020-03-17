import React from 'react';
import techService from '../../state/tech/techService';
import { useService } from '../../state';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from '../../state';
import PlaceholderPerson from '../../images/placeholderPerson.png';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '330px',
        height: '120px',
        background: props => props.disabled && '#dcdbdb',
        backgroundColor: '#FFFFFF',
        borderRadius: "6px",
        marginTop: "20px",
        // border: "1px solid black",

        '& *': {
            margin: '0',
            padding: '0',
        },

        '& button': {
            paddingRight: theme.spacing(1),
            color: "#2678C0",
        },

        '& .photo': {
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%',
            height: 'auto',
            borderRadius: "6px 0px 0px 6px",
        },
    },

    photoWrapper: {
        position: 'relative',
        width: '120px',
        height: '120px',
        overflow: 'hidden'
    },

    info: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: '160px',
    },

    controls: {
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        paddingTop: theme.spacing(1),
    },
}));

/*
    Displays information about a specific tech.

    Example Props:
        "handleEdit": "handleEdit()",
        "docId": "mljjtLxunQHGiyGymRmt",
        "team": {
            "docId": "gYoobfPzHpk4CYfp3f88",
            "name": "Clean Team",
            "users": "Array[3]"
        },
        "disabled": true,
        "displayName": "Tester McGee",
        "email": "testermcgee@gmail.com",
        "phone": {
            "primary": "(555) 555-5555"
        },
        "photoUrl": "https://example.com",
        "role": [
            "tech"
        ],
        "roles": [
            "tech"
        ]
*/
const TechCard = ({ docId, displayName, photoUrl, disabled, team, handleEdit }) => {
    const classes = useStyles({ disabled });
    const [, dispatch] = useStateValue();
    const service = useService(techService, dispatch);

    const handleArchive = () => service.setTechDisabled(docId, !disabled);

    return (
        <div className={classes.root}>
            <div className={classes.photoWrapper}>
                <img className="photo" src={photoUrl || PlaceholderPerson} alt={displayName} />
            </div>
            <div className={classes.info}>
                <h2>{displayName}</h2>
                <p>{team && team.name}</p>
                <div className={classes.controls}>
                    <Button className={classes.button} onClick={handleArchive}>{disabled ? 'Activate' : 'Archive'}</Button>
                    <Button className={classes.button} onClick={() => handleEdit(docId)} disabled={disabled}>Edit</Button>
                </div>
            </div>
        </div>
    );
};

export default TechCard;
