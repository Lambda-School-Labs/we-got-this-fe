import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
//
//Config
import { initGoogleClient } from '../config/googleClient';

//Components / Scenes
import {
    SplashLoading,
    RegisterCompany,
    CreateTechForm,
    SideBar,
    TopBar,
    CreateTeamForm,
} from '../components';
import PrivateRoute from '../components/routes/PrivateRoute';
import AdminRoute from '../components/routes/AdminRoute';

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
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
    },
}));

function App() {
    const [{ auth }, dispatch] = useStateValue();
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const history = useHistory();

    useEffect(() => {
        //Initiliaze Google API
        initGoogleClient(() => {
            actions.setCalendarLoaded(dispatch);
        });

        //Auth Change With Firebase
        Firebase.onAuthStateChanged(async user => {
            if (user !== null) {
                let res = await actions.getOrCreateCurrentUser(dispatch, user);
                if (res === true) {
                    history.push(routes.HOME);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    if (isLoading) {
        return <SplashLoading width="400px" height="400px" />;
    } else {
        return (
            <div className={classes.root}>
                <CssBaseline />
                <SideBar>
                    <Switch>
                        <PrivateRoute
                            exact
                            path={routes.HOME}
                            component={Calendar}
                        />
                        <Route exact path={routes.AUTH} component={Auth} />
                        <PrivateRoute
                            path={routes.PROFILE}
                            component={Profile}
                        />
                        <AdminRoute
                            exact
                            path={routes.TECHS}
                            component={Techs}
                        />
                        <PrivateRoute
                            exact
                            path={routes.CUSTOMERS}
                            component={Customers}
                        />
                        {mobile ? (
                            <>
                                <PrivateRoute
                                    exact
                                    path={routes.CUSTOMER_PROFILE}
                                    component={Customer}
                                />
                                <PrivateRoute
                                    path={routes.JOB_DETAILS}
                                    component={Job}
                                />
                            </>
                        ) : (
                            <PrivateRoute
                                path={routes.CUSTOMER_PROFILE}
                                component={Customer}
                            />
                        )}
                        <PrivateRoute path={routes.JOBS} component={Jobs} />
                        <AdminRoute
                            path={routes.CREATE_TECH}
                            component={CreateTechForm}
                        />
                        <AdminRoute
                            path={routes.CREATE_TEAM_FORM}
                            component={CreateTeamForm}
                        />
                    </Switch>
                </SideBar>
            </div>
        );
    }
}

export default App;
