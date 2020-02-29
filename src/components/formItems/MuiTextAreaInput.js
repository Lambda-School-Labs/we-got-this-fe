import React from 'react';
import { useField } from 'formik';
import { TextField } from '@material-ui/core';

const MuiTextAreaInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <TextField id="outlined-basic standard-multiline-flexible" variant="outlined"
          multiline
          rowsMax="4"
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

export default MuiTextAreaInput;
