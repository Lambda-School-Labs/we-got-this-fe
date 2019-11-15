import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../state';
import { useForm } from '../../hooks/useForm';
import { makeStyles, TextareaAutosize } from '@material-ui/core';
import Column from '../../components/styles/containers/Column';
import Row from '../../components/styles/containers/Row';
import Grid from '@material-ui/core/Grid';
import { withState } from '../../state';

import { createCustomer } from '../../state/customer/customerReducer';
import { actions } from '../../state/customer/customerActions';
import { Form, Field, withFormik, Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles({
    column: {
        display: 'flex',
        flexDirection: 'column',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
    },
});

const CustomerForm = ({ errors, touched, values, status }) => {
    const [state, setState] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        if (status) {
            setState([...state, status]);
        }
    }, [status, state]);

    console.log('Values: ', values, 'Status: ', status);

    return (
        <Form>
            <Grid container spacing={3}>
                <Grid item className={classes.column} xs={6}>
                    <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={values.firstName}
                    />
                    {touched.name && errors.name && (
                        <p className="error">{errors.firstname}</p>
                    )}

                    <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={values.lastName}
                    />
                    {touched.lastname && errors.name && (
                        <p className="error">{errors.lastname}</p>
                    )}

                    <Field
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={values.phoneNumber}
                    />
                    {touched.phonenumber && errors.phonenumber && (
                        <p className="error">{errors.phonenumber}</p>
                    )}

                    <Field
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                    />
                    {touched.email && errors.email && (
                        <p className="error">{errors.email}</p>
                    )}

                    <Field
                        component="select"
                        className="payment-select"
                        name="payment"
                        placeholder="Choose a Payment Method"
                        value={values.payment}
                    >
                        <option>Choose a Payment Method </option>
                        <option value="cash">Cash</option>
                        <option value="check">Check</option>
                        <option value="debit/credit">Debit/Credit Card</option>
                    </Field>

                    <Field
                        component="select"
                        className="hearabout-select"
                        name="hearabout"
                        value={values.hearabout}
                    >
                        <option>How Did You Hear About Us</option>
                        <option value="customer referral">
                            Customer Referral
                        </option>
                        <option value="internet">Internet</option>
                        <option value="employee referral">
                            Employee Refferal
                        </option>
                    </Field>
                </Grid>

                <Grid item className={classes.column} xs={6}>
                    <Field
                        type="text"
                        name="street"
                        placeholder="Service Address"
                        value={values.street}
                    />
                    {touched.serviceaddress && errors.serviceaddress && (
                        <p className="error">{errors.serviceaddress}</p>
                    )}

                    <Field
                        type="text"
                        name="city"
                        placeholder="City"
                        value={values.city}
                    />
                    {touched.city && errors.city && (
                        <p className="error">{errors.city}</p>
                    )}

                    <Field
                        type="text"
                        name="region"
                        placeholder="State"
                        value={values.region}
                    />
                    {touched.state && errors.state && (
                        <p className="error">{errors.state}</p>
                    )}

                    <Field
                        type="text"
                        name="zipcode"
                        placeholder="Zip Code"
                        value={values.zipcode}
                    />
                    {touched.zipcode && errors.state && (
                        <p className="error">{errors.zipcode}</p>
                    )}

                    <textarea
                        type="text"
                        name="notes"
                        placeholder="Special Notes"
                        value={values.notes}
                    />
                    {touched.zipcode && errors.notes && (
                        <p className="error">{errors.notes}</p>
                    )}

                    <div className={classes.controls}>
                        {' '}
                        <button type="button">Cancel</button>{' '}
                        <button type="submit">Submit</button>{' '}
                    </div>
                </Grid>
            </Grid>
        </Form>
    );
};

const CreateCustomerForm = withFormik({
    mapPropsToValues({
        firstName,
        lastName,
        email,
        phoneNumber,
        street,
        city,
        region,
        zipcode,
    }) {
        return {
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
            phoneNumber: phoneNumber || '',
            street: street || '',
            city: city || '',
            region: region || '',
            zipcode: zipcode || '',
        };
    },

    validationSchema: Yup.object().shape({
        firstName: Yup.string().required('Must enter a First Name'),
        lastName: Yup.string().required('Must enter a Last Name'),
        phoneNumber: Yup.number().required('Must enter a Number'),
        street: Yup.string().required('Must enter an Address'),
        email: Yup.string().required('Must enter an Email'),
        city: Yup.string().required('Must enter an City'),
        region: Yup.string().required('Must enter a State'),
        zipcode: Yup.number().required('Must enter an Zip'),
    }),

    handleSubmit(values, { setStatus, props, resetForm }) {
        let accountId = props.state.auth.currentUser.accountId;
        console.log('Account ID: ', accountId);
        actions
            .addCustomer(props.dispatch, { accountId, ...values })
            .then(res => {
                if (res == true) {
                    console.log('redirecting');
                    props.history.push('/customers');
                }
            });
        resetForm();
    },
})(CustomerForm);

export default withState(CreateCustomerForm);
