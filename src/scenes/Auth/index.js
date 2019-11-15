import React from 'react';
import { useStateValue } from '../../state';
import { actions } from '../../state/auth/authActions';

const Auth = () => {
    const [{ auth }, dispatch] = useStateValue();

    return (
        <>
            <h1>Auth</h1>
            {auth.loadingUser ? (
                <h4>Loading</h4>
            ) : (
                <h4>{auth.currentUser && auth.currentUser.displayName}</h4>
            )}
            <button
                onClick={() => {
                    actions.login(dispatch);
                }}
            >
                Sign In With Google
            </button>
            <button
                onClick={() => {
                    actions.login(dispatch);
                }}
            >
                Register With Google
            </button>
            <button
                onClick={() => {
                    actions.logout(dispatch);
                }}
            >
                Sign Out
            </button>
        </>
    );
};

export default Auth;
