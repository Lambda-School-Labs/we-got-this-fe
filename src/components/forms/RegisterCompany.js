import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import { withState } from "../../state"
import { actions } from "../../state/auth/authActions";
import { routes } from '../../constants/routes';


const RegisterCompany = ({errors, touched, values, status}) => {
    const [forms, setForms] = useState([]);
    // console.log("this is touched", touched);
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
                        <Field type="text" name="firstName" placeholder="First Name"/>
                        {touched.firstName && errors.firstName && (
                        <p className="error">{errors.firstName}</p>)}
                    </div>

                    <div>
                        <Field type="text" name="lastName" placeholder="Last Name"/>
                        {touched.lastName && errors.lastName && (
                        <p className="error">{errors.lastName}</p>)}
                    </div>

                    <div>
                        <Field type="email" name="email" placeholder="Email"/>
                        {touched.email && errors.email && (
                        <p className="error">{errors.email}</p>)}
                    </div>

                    <div>
                        <Field type="text" name="company" placeholder="Company Name"/>
                        {touched.company && errors.company && (
                        <p className="error">{errors.company}</p>)}
                    </div>

                    <div>
                        <Field type="text" name="phoneNumber" placeholder="Phone Number" />
                        {touched.phoneNumber && errors.phoneNumber && (
                        <p className="error">{errors.phoneNumber}</p>)}
                    </div>

                    <button type="submit">Submit</button>
                </Form>
            </div>
        </div>
    );
}

const RegisterForm = withFormik({
    mapPropsToValues({firstName, lastName, email, company, phoneNumber}){
        return {
            firstName: firstName || "",
            lastName: lastName || "",
            email: email || "",
            company: company || "",
            phoneNumber: phoneNumber || ""
        };
    },
    validationSchema: Yup.object().shape({
        firstName: Yup.string().required("Enter First Name"),
        lastName: Yup.string().required("Enter your Last Name"),
        email: Yup.string().email("Email Not Valid").required("Email Is Required"),
        company: Yup.string().required("Company Name is required"),
        phoneNumber: Yup.string().min(10, 'Your phone number must be at least 10 digits').required("Phone Number is required")
    }),

    handleSubmit(values, {setStatus, props, resetForm}) {
        actions.createCompany(props.dispatch, values)
        .then (res => {
            if (res == true) {
                props.history.push(routes.HOME);
            }
        });
        resetForm();
    }
})(RegisterCompany);

export default withState(RegisterForm);