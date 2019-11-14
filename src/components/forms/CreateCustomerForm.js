import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../state';
import { useForm } from '../../hooks/useForm';
import { makeStyles, TextareaAutosize } from '@material-ui/core';
import Column from '../../components/styles/containers/Column';
import Row from '../../components/styles/containers/Row'
import Grid from '@material-ui/core/Grid';

import { createCustomer } from '../../state/customer/customerReducer';
import { actions } from '../../state/customer/customerActions';
import { Form, Field, withFormik, Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles({
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between'
    },
});

const CustomerForm = ({ errors, touched, values, status }) => {
    const [state, setState] = useState([]); 
    console.log("custardmer form", touched);
    const classes = useStyles();
    useEffect(() => {
        if (status) {
            setState([...state, status]);
        }
    }, [status, state]);
    
    return (
        <Form>
            
            <Grid container spacing={3}>
            <Grid item className={classes.column} xs={6}>
            <Field type="text" name="firstname" placeholder="First Name" />
            {touched.name && errors.name && (
                <p className="error">{errors.firstname}</p>
            )}

            <Field type="text" name="lastname" placeholder="Last Name" />
            {touched.lastname && errors.name && (
                <p className="error">{errors.lastname}</p>
            )}

            <Field type="text" name="phonenumber" placeholder="Phone Number" />
            {touched.phonenumber && errors.phonenumber && (
                <p className="error">{errors.phonenumber}</p>
            )}

            <Field type="text" name="email" placeholder="Email" />
            {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
            )}

            <Field component="select" className="payment-select" name="payment" placeholder="Choose a Payment Method">
                <option>Choose a Payment Method </option>
                <option value="role">Cash</option>
                <option value="role">Check</option>
                <option value="role">Debit/Credit Card</option>
            </Field>

            <Field
                component="select"
                className="hearabout-select"
                name="hearabout"
            >
                <option>How Did You Hear About Us</option>
                <option value="role">Customer Referral</option>
                <option value="role">Internet</option>
                <option value="role">Employee Refferal</option>
            </Field>
            </Grid>
            
            <Grid item className={classes.column} xs={6} >     
            <Field
                type="text"
                name="serviceaddress"
                placeholder="Service Address"
            />
            {touched.serviceaddress && errors.serviceaddress && (
                <p className="error">{errors.serviceaddress}</p>
            )}

            <Field type="text" name="city" placeholder="City" />
            {touched.city && errors.city && (
                <p className="error">{errors.city}</p>
            )}

            <Field type="text" name="state" placeholder="State" />
            {touched.state && errors.state && (
                <p className="error">{errors.state}</p>
            )}

            <Field type="text" name="zipcode" placeholder="Zip Code" />
            {touched.zipcode && errors.state && (
                <p className="error">{errors.zipcode}</p>
            )}

            <textarea type="text" name="notes" placeholder="Special Notes" />
            {touched.zipcode && errors.notes && (
                <p className="error">{errors.notes}</p>
            )}

            <div className={classes.controls}> <button type="button">Cancel</button> <button type="submit">Submit</button> </div>
            </Grid>
            </Grid>
        </Form>
    );
};

const CreateCustomerForm = withFormik({
    mapPropsToValues({firstName, lastName, email, phonenumber, serviceaddress, city, state, zipcode}){
        return {
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            phonenumber: phonenumber || "",
            serviceaddress: serviceaddress || "",
            city: city || "",
            state: state || "",
            zipcode: zipcode || ""
        };
    },

    validationSchema: Yup.object().shape({
        firstName: Yup.string()
        .required('Must enter a First Name'),
    lastName: Yup.string()
        .required('Must enter a Last Name'),
    phonenumber: Yup.number()
        .required('Must enter a Number'),
    serviceaddress: Yup.string()
        .required('Must enter an Address'),
    email: Yup.string()
        .required('Must enter an Email'),
    city: Yup.string()
        .required('Must enter an City'),
    state: Yup.string()
        .required('Must enter a State'),
    zip: Yup.number()
        .required('Must enter an Zip')
    }),

    handleSubmit(values, {setStatus, props, resetForm}) {
        actions.addCustomer(props.dispatch, values)
        .then (res => {
            if (res == true) {
                props.history.push("/");
            }
        });
        resetForm();
    }
})(CustomerForm);

export default CreateCustomerForm;
