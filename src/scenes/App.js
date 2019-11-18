import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//
//Config
import { initGoogleClient } from '../config/googleClient';

//Components / Scenes
import {
    SplashLoading,
    RegisterCompany,
    InviteTech,
    SideBar,
    TopBar,
    CreateTeamForm,
} from '../components';

//Forms

import Calendar from './Calendar';
import Auth from './Auth';
import Jobs from './Jobs';
import Profile from './Profile';
import Customers from './Customers';
import Customer from './Customer';
import Techs from './Techs';
import Job from './Job';

//Styles
import RootContainer from '../components/styles/containers/RootContainer';
import MainContainer from '../components/styles/containers/MainContainer';

//Constants
import { routes } from '../constants/routes';

//State
import { useStateValue } from '../state';
import { actions } from '../state/auth/authActions';

//Fire
import Firebase from '../config/firebase';

import { CssBaseline } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
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

function App() {
    const [{ auth }, dispatch] = useStateValue();
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        //Initiliaze Google API
        initGoogleClient();

        //Auth Change With Firebase
        Firebase.onAuthStateChanged(user => {
            if (user !== null) {
                actions.getOrCreateCurrentUser(dispatch, user);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }, [dispatch]);

    if (isLoading) {
        return <SplashLoading />;
    } else {
        return (
            <BrowserRouter>
                <div className={classes.root}>
                    <CssBaseline />
                    <TopBar />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route
                                exact
                                path={routes.HOME}
                                component={Calendar}
                            />
                            <Route exact path={routes.AUTH} component={Auth} />
                            <Route path={routes.PROFILE} component={Profile} />
                            <Route path={routes.TECHS} component={Techs} />
                            <Route path={routes.JOBS} component={Jobs} />
                            <Route
                                exact
                                path={routes.CUSTOMERS}
                                component={Customers}
                            />
                            {mobile ? (
                                <>
                                    <Route
                                        exact
                                        path={routes.CUSTOMER_PROFILE}
                                        component={Customer}
                                    />
                                    <Route
                                        path={routes.JOB_DETAILS}
                                        component={Job}
                                    />
                                </>
                            ) : (
                                <Route
                                    path={routes.CUSTOMER_PROFILE}
                                    component={Customer}
                                />
                            )}
                            <Route
                                path={routes.INVITE_TECH}
                                component={InviteTech}
                            />
                            <Route
                                path={routes.CREATE_TEAM_FORM}
                                component={CreateTeamForm}
                            />
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
