import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

const MuiTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <TextField
            type={props.type}
            name={props.name}
            label={label}
            margin="none"
            error={meta.touched && !!meta.error}
            {...field}
            {...props}
            style={{ width: '100%' }}
        />
    );
};

export default MuiTextInput;
