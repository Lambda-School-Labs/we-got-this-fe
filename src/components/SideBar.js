import React, { useState, useEffect } from 'react';
import {
    Button,
    Drawer,
    Divider,
    List,
    ListItem,
    useMediaQuery,
    Icon,
    IconButton,
    Typography,
    TextField,
    MenuItem,
    AppBar,
    Toolbar,
    Hidden,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core';
import { NavLink, Link } from 'react-router-dom';
import { routes } from '../constants/routes';

import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuIcon from '@material-ui/icons/Menu';

import { useStateValue } from '../state';

const drawerWidth = 150;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        marginBottom: 48,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    link: {
        textDecoration: 'none',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        color: theme.palette.common.white,
        fontSize: 16,
    },
    logo: {
        textDecoration: 'none',
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.common.white,
        marginRight: theme.spacing(2),
        fontSize: 18,
    },
    drawerPaper: {
        padding: theme.spacing(1),
        zIndex: 0,
        backgroundColor: '#2678C0',
    },
    content: {
        flexGrow: 1,
        width: `calc(100% - ${drawerWidth}px)`,
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginTop: 55,
            width: '100%',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    routes: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const activeStyles = {
    fontWeight: 600,
    textDecoration: 'underline',
};

const SideBar = ({ children }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [{ auth }, dispatch] = useStateValue();
    const classes = useStyles();

    const theme = useTheme();
    const smallWidth = useMediaQuery(theme.breakpoints.down('xs'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <>
            <Hidden smUp implementation="js">
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            We Got This!
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{ paper: classes.drawerPaper }}
                    anchor="top"
                    ModalProps={{ keepMounted: true }}
                >
                    <List>
                        <ListItem>
                            <NavLink
                                to={routes.HOME}
                                className={classes.link}
                                onClick={handleDrawerToggle}
                                activeStyle={activeStyles}
                            >
                                Dashboard
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink
                                to={routes.CUSTOMERS}
                                className={classes.link}
                                onClick={handleDrawerToggle}
                                activeStyle={activeStyles}
                            >
                                Customers
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink
                                to={routes.TECHS}
                                className={classes.link}
                                onClick={handleDrawerToggle}
                                activeStyle={activeStyles}
                            >
                                Techs
                            </NavLink>
                        </ListItem>
                        <ListItem>
                            <NavLink
                                to={routes.PROFILE}
                                className={classes.link}
                                onClick={handleDrawerToggle}
                                activeStyle={activeStyles}
                            >
                                Admin
                            </NavLink>
                        </ListItem>
                    </List>
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="js">
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{ paper: classes.drawerPaper }}
                    anchor="left"
                >
                    <div className={classes.routes}>
                        <Typography variant="h5">
                            <Link to={routes.HOME} className={classes.logo}>
                                We Got This!
                            </Link>
                        </Typography>
                        <NavLink
                            exact
                            to={routes.HOME}
                            className={classes.link}
                            activeStyle={activeStyles}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to={routes.CUSTOMERS}
                            className={classes.link}
                            activeStyle={activeStyles}
                        >
                            Customers
                        </NavLink>
                        <NavLink
                            to={routes.TECHS}
                            className={classes.link}
                            activeStyle={activeStyles}
                        >
                            Techs
                        </NavLink>
                    </div>
                    {auth.currentUser ? (
                        <IconButton component={Link} to={routes.PROFILE}>
                            <AccountCircle style={{ color: 'white' }} />
                        </IconButton>
                    ) : (
                        <Button
                            component={Link}
                            to={routes.AUTH}
                            className={classes.white}
                        >
                            Login
                        </Button>
                    )}
                </Drawer>
            </Hidden>
            <div className={classes.content}>{children}</div>
        </>
    );
};

export default SideBar;
