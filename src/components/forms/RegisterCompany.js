import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { withState } from '../../state';
import { actions } from '../../state/auth/authActions';

const RegisterCompany = ({ errors, touched, values, status }) => {
    const [forms, setForms] = useState([]);
    console.log('this is touched', touched);
    useEffect(() => {
        if (status) {
            setForms([...forms, status]);
        }
    }, [status, forms]);

    return (
        <div>
            <div>
                <h1>RegisterCompany</h1>
            </div>
            <div>
                <Form>
                    <div>
                        <Field
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                        />
                    </div>

                    <div>
                        <Field
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                        />
                    </div>

                    <div>
                        <Field type="email" name="email" placeholder="Email" />
                    </div>

                    <div>
                        <Field
                            type="text"
                            name="company"
                            placeholder="Company Name"
                        />
                    </div>

                    <div>
                        <Field
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                        />
                    </div>

                    <button type="submit">Submit</button>
                </Form>
            </div>
        </div>
    );
};

const FormikForm = withFormik({
    mapPropsToValues({ firstName, lastName, email, company, phoneNumber }) {
        return {
            firstName: firstName || '',
            lastName: lastName || '',
            email: email || '',
            company: company || '',
            phoneNumber: phoneNumber || '',
        };
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().required('Enter First Name'),
        lastName: Yup.string().required('Enter your Last Name'),
        email: Yup.string()
            .email('Email Not Valid')
            .required('Email Is Required'),
        company: Yup.string().required('Company Name is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
    }),

    handleSubmit(values, { setStatus, props }) {
        actions.createCompany(props.dispatch, values).then(res => {
            console.log(res);
        });
    },
})(RegisterCompany);

export default withState(FormikForm);
