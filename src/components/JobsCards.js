import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function SimpleCard(props) {
      const classes = useStyles();
  return (
    <Card>
        <h2>
            Time
        </h2>
        <h1>
            {props.name}
        </h1>
        <div>
            {props.street}
        </div>
        <div>
            {props.city}, {props.state} {props.zip}
        </div>
        <div>
            {props.phone}
        </div>
        <Button>Reschedule</Button>
    </Card>
  );
}