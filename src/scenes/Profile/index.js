import React from 'react';
import { useStateValue } from '../../state';
import { actions } from '../../state/auth/authActions';

const Me = () => {
    const [{ auth }, dispatch] = useStateValue();
    return (
        <>
            <h1>Me is {auth.currentUser && auth.currentUser.displayName} </h1>
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

export default Me;
