import React from 'react';
import { useField } from 'formik';
import { TextField, MenuItem } from '@material-ui/core';

const MuiSingleSelectInput = ({
    label,
    data,
    valueKey,
    displayKey,
    ...props
}) => {

	const [field, meta] = useField(props);
	return (
		<TextField id="outlined-basic standard-multiline-flexible" variant="outlined"
          multiline
          rowsMax="3"
			select
			type={props.type}
			name={props.name}
			label={label}
			error={meta.touched && !!meta.error}
			{...field}
			{...props}
			style={{width: '100%'}}
		>
			{data &&
				data.map((item, i) => (
					<MenuItem key={i} value={item.value || item[valueKey]}>
						{item.display || item[displayKey]}
					</MenuItem>
				))}
		</TextField>
	);
};

export default MuiSingleSelectInput;
