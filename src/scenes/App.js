import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
//
//Config
import { initGoogleClient } from '../config/googleClient';

//Components / Scenes
import { Navigation, CreateCustomerForm, SplashLoading, RegisterCompany, InviteTech, SideBar, TopBar } from '../components';


import Calendar from './Calendar';
import Auth from './Auth';
import Dashboard from './Dashboard';
import Me from './Me';

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
import { makeStyles } from '@material-ui/core/styles';

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


//
//Config
var storageRef = Firebase.getStorageRef();

const Dashboard = () => {
    const [files, setFiles] = useState(null);

    const handleFiles = e => {
        setFiles(e.target.files);
    };

    return (
        <>
            <h1>Dashboard</h1>{' '}
            <label htmlFor="fileInput">Select Files to Upload</label>
            <input
                type="file"
                id="fileInput"
                multiple
                onChange={e => {
                    handleFiles(e);
                }}
            />
            {files !== null && (
                <button
                    onClick={() => {
                        console.log('Clicked!');
                        storageRef
                            .child('images/me')
                            .put(files[0])
                            .then(snapshot => {
                                console.log(snapshot);
                            });
                    }}
                >
                    Upload!
                </button>
            )}
        </>
    );
};

const Me = () => {
    const [{ auth }] = useStateValue();
    return <h1>Me is {auth.currentUser && auth.currentUser.displayName} </h1>;
};

function App() {
    const [{ auth }, dispatch] = useStateValue();
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();

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
                    <SideBar />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />

                        <Route exact path={routes.AUTH} component={Auth} />
                        <Route path={routes.HOME} component={Dashboard} />
                        <Route path={routes.PROFILE} component={Me} />
                        <Route path={routes.CALENDAR} component={Calendar} />

                        <CreateCustomerForm />
                        <RegisterCompany />
                    </main>
                </div>

                <Navigation />

                <Route exact path={routes.AUTH} component={Auth} />
                <Route path={routes.HOME} component={Dashboard} />
                <Route path={routes.ME} component={Me} />
                <Route path={routes.CALENDAR} component={Calendar} />

                {/* <CreateCustomerForm /> */}
                <InviteTech />

                <CreateCustomerForm />
                <RegisterCompany/>

            </BrowserRouter>
        );
    }
}

export default App;
