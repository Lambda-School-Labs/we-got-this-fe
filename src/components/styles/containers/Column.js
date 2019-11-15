import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    flex: props => ({
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: props.justify,
        alignItems: props.align,
        padding: props.padding,
    }),
});

const Column = ({
    justify = 'flex-start',
    align = 'flex-start',
    padding = 0,
    children,
}) => {
    const classes = useStyles({ justify, align, padding });

    return <div className={classes.flex}>{children}</div>;
};

export default Column;
