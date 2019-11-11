import React from 'react';
import { useStateValue } from '../state';
import { useForm } from '../hooks/useForm';
import { actions } from '../state/customer/customerActions';

const CreateCustomerForm = () => {
    const [{customer}, dispatch] = useStateValue();

    const submitForm = values => {
        actions.addCustomer(dispatch, values);
    };

    const [values, handleChange, handleSubmit] = useForm(
        {
            name: '',
            phone: '',
        },
        submitForm
    );

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Customer</h1>
            <label htmlFor="name">Customer Name</label>
            <input
                type="text"
                name="name"
                placeholder="Jenny"
                onChange={e => handleChange(e)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateCustomerForm;
