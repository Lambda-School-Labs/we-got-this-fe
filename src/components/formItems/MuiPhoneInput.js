import React from 'react';
import {useField} from 'formik';
import {TextField} from '@material-ui/core';

const MuiPhoneInput = ({label, ...props}) => {
	const [field, meta] = useField(props);
	return (
		<TextField
			type={props.type}
			name={props.name}
			label={label}
			id={label}
			margin='none'
			error={!!meta.error}
			value={field.value}
			onChange={e => {
				field.onChange(checkPhone(e));
			}}
			{...props}
			style={{width: '100%'}}
		/>
	);
};

function checkPhone(e) {
	e.target.value.replace(/[^0-9]+?/g, '');
	switch (e.target.value.length) {
		case 10:
			e.target.value =
				'(' +
				e.target.value.substr(0, 3) +
				') ' +
				e.target.value.substr(3, 3) +
				'-' +
				e.target.value.substr(6, 4);
			break;
		default:
			return e;
	}
	return e;
}

export default MuiPhoneInput;
