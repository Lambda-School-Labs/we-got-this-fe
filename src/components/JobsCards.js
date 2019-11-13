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


export default function SimpleCard() {
      const classes = useStyles();
  return (
    <Card>
        <h2>
            Time
        </h2>
        <h1>
            Client Name
        </h1>
        <div>
            Address
        </div>
        <div>
            Address 2
        </div>
        <div>
            City, State Zip Code
        </div>
        <div>
            Phone Number
        </div>
        <Button>Message</Button>
        <Button>Reschedule</Button>
    </Card>
  );
}