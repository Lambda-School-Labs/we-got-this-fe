import React from 'react';
import { useHistory } from 'react-router-dom';
import { Drawer, Divider, List, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { privateRoutes, publicRoutes } from '../constants/routes';

const drawerWidth = 150;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: {
        height: 48,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const SideBar = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
            anchor="left"
        >
            <div className={classes.toolbar}>
                <h2 style={{ margin: 0, padding: 0 }}>We Got This!</h2>
            </div>
            <Divider />
            <List>
                {privateRoutes.map(route => (
                    <ListItem button onClick={() => history.push(route.path)}>
                        {route.name}
                    </ListItem>
                ))}
                {publicRoutes.map(route => (
                    <ListItem button onClick={() => history.push(route.path)}>
                        {route.name}
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default SideBar;
