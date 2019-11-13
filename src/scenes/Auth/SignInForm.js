import React, { useState } from 'react';

import firebase from '../../config/firebase';

const SignInForm = () => {
    const [values, setValues] = useState(null);

    const handleChange = event => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        //alert('handling new user');
        console.log(values);
        await firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert('ErrorCode', errorCode, 'ErrorMessage', errorMessage);
            });
        console.log('Here!');
    };

    console.log(values);

    return (
        <form onSubmit={e => handleSubmit(e)}>
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="text"
                name="email"
                placeholder="email"
                onChange={e => handleChange(e)}
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                onChange={e => handleChange(e)}
            />
            <button type="submite">Create Account</button>
        </form>
    );
};

export default SignInForm;
