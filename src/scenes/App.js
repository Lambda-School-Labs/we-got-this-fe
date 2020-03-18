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
import Welcome from './Welcome';

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

import { CssBaseline, Grid } from '@material-ui/core';
import {
    useTheme,
    makeStyles,
    createMuiTheme,
    ThemeProvider,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import ReactGA from 'react-ga';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        height: '100%',
        flexDirection: props => (props.mobile ? 'column' : 'row'),
    },
    content: {
        padding: theme.spacing(3),
        position: 'relative',
        left: props => !props.mobile && '90px',
        width: props => !props.mobile && 'calc(100% - 90px)',
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2678C0',
        },
    },
});

function App() {
    const [{ auth }, dispatch] = useStateValue();
    const [isLoading, setIsLoading] = useState(true);
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles({ mobile });
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
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps

        return history.listen(location => {
            ReactGA.set({ page: location.pathname });
            ReactGA.pageview(location.pathname);
        });
    }, [dispatch]);

    if (isLoading) {
        return <SplashLoading width="400px" height="400px" />;
    } else {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className={classes.root}>
                    <SideBar />
                    <main className={classes.content}>
                        <Switch>
                            <PrivateRoute
                                exact
                                path={routes.HOME}
                                component={Calendar}
                            />
                            <PrivateRoute
                                exact
                                path={routes.WELCOME}
                                component={Welcome}
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
                            <PrivateRoute path={routes.JOBS} component={Jobs} />
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
                            <AdminRoute
                                path={routes.CREATE_TECH}
                                component={CreateTechForm}
                            />
                            <AdminRoute
                                path={routes.CREATE_TEAM_FORM}
                                component={CreateTeamForm}
                            />
                        </Switch>
                    </main>
                </div>
            </ThemeProvider>
        );
    }
}

export default App;
