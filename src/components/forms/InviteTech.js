import React from 'react';
import { Formik } from "formik";
// import { useForm } from '../hooks/useForm';
// import { inviteTech } from '../state/reducers/techReducer';
import * as Yup from "yup";
import Error from '../Error';




const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Must enter a First Name'),
    lastName: Yup.string()
        .required('Must enter a Last Name'),
    phone: Yup.number()
        .required('Must enter a Number'),
    address: Yup.string()
        .required('Must enter an Address'),
    email: Yup.string()
        .required('Must enter an Email'),
    city: Yup.string()
        .required('Must enter an City'),
    state: Yup.string()
        .required('Must enter a State'),
    zip: Yup.number()
        .required('Must enter an Zip'),
    notes: Yup.string()
        .max(255, 'Must be shorter than 255')
})


const InviteTech = () => {

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                email: '',
                notes: '',
                city: '',
                zip: ''
            }}

            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)

                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    resetForm();
                    setSubmitting(false);
                    console.log('SS..', setSubmitting)
                }, 500);
            }}>

            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                

                <form className='Form' onSubmit={handleSubmit}>
                    <div className='tech-form-left'>

                        <div>
                            <input onChange={handleChange} name='firstName' placeholder='First Name' value={values.firstName} onBlur={handleBlur} className={touched.firstName && errors.firstName ? 'has-error' : null} />
                            <Error touched={touched.firstName} message={errors.firstName} />
                        </div>
                        <div>
                            <input onChange={handleChange} name='lastName' placeholder='Last Name' value={values.lastName} onBlur={handleBlur} className={touched.lastName && errors.lasttName ? 'has-error' : null} />
                            <Error touched={touched.lastName} message={errors.lastName} />
                        </div>
                        <div>
                            <input onChange={handleChange} name='phone' placeholder='Phone' value={values.phone} onBlur={handleBlur} className={touched.phone && errors.phone ? 'has-error' : null} />
                            <Error touched={touched.phone} message={errors.phone} />
                        </div>
                        <div>
                            <input onChange={handleChange} name='address' placeholder='Address' value={values.address} onBlur={handleBlur} className={touched.address && errors.address ? 'has-error' : null} />
                            <Error touched={touched.address} message={errors.address} />
                        </div>
                        <div>
                            <textarea onChange={handleChange} name='notes' placeholder='Notes' value={values.notes} onBlur={handleBlur} className={touched.notes && errors.notes ? 'has-error' : null} />
                            <Error touched={touched.notes} message={errors.notes} />
                        </div>

                    </div> {/* it-form-top-left end */}
                    <div className='tech-form-right'>

                        <div>
                            <input onChange={handleChange} name='email' placeholder='Email' value={values.email} onBlur={handleBlur} className={touched.email && errors.email ? 'has-error' : null} />
                            <Error touched={touched.email} message={errors.email} />
                        </div>
                        <div>
                            <input onChange={handleChange} name='zip' placeholder='Zip' value={values.zip} onBlur={handleBlur} className={touched.zip && errors.zip ? 'has-error' : null} />
                            <Error touched={touched.zip} message={errors.zip} />
                        </div>
                        <div>
                            <input onChange={handleChange} name='city' placeholder='City' value={values.city} onBlur={handleBlur} className={touched.city && errors.city ? 'has-error' : null} />
                            <Error touched={touched.city} message={errors.city} />
                        </div>
                        <div>
                            <input onChange={handleChange} name='state' placeholder='State' value={values.state} onBlur={handleBlur} className={touched.state && errors.state ? 'has-error' : null} />
                            <Error touched={touched.state} message={errors.state} />
                        </div>
                        <div className='tech-buttons'>
                            <button id='tech-cancel'>Cancel</button>
                            <button type='submit' disabled={isSubmitting}>Submit</button>
                        </div> {/* tech-buttons end */}

                    </div> {/* tech-form-right end */}
                </form> /* Form end */
            )}
        </Formik>
    )
}
export default InviteTech;