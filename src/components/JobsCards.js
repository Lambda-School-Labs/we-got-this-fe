import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
    <Card className={classes.card}>
      <CardContent>
        <div>
          Word of the Day
        </div>
        <div>
            Lucas
        </div>
        <div>
          Sanny
        </div>
        <div>
          Tashi
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}