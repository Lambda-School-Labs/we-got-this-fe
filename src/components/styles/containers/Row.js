import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    flex: props => ({
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: props.justify,
        alignItems: props.align,
        padding: props.padding,
    }),
});

const Row = ({
    justify = 'flex-start',
    align = 'flex-start',
    padding = 0,
    children,
}) => {
    const classes = useStyles({ justify, align, padding });

    return <div className={classes.flex}>{children}</div>;
};

export default Row;
