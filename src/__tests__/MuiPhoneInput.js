import React from 'react';
import {render, fireEvent, act, wait, waitForElement} from 'providers';
import userEvent from '@testing-library/user-event';
import {axe} from 'jest-axe';

import {Formik, Form} from 'formik';
import MuiPhoneInput from '../components/formItems/MuiPhoneInput';
// import {render, act} from '@testing-library/react';
// import {getQueriesForElement, fireEvent} from '@testing-library/dom';

test('it renders', () => {
	let {debug, getByLabelText} = render(
		<Formik>
			<MuiPhoneInput name='phone' label='Phone Number' type='text' />
		</Formik>,
	);
	let input = getByLabelText(/Phone Number/i);
	expect(input).toHaveAttribute('type', 'text');
	// debug();
});

test('adding 10 digits converts string to phone number', async () => {
	const {getByLabelText, debug} = render(
		<Formik initialValues={{phone: ''}}>
			<Form>
				<MuiPhoneInput name='phone' label='Phone Number' type='text' />
			</Form>
		</Formik>,
	);

	let input = getByLabelText(/phone number/i);

	// Same as below
	// await wait(() => {
	// 	fireEvent.change(input, {target: {value: '1234567890'}});
	// });
	await wait(() => {
		userEvent.type(input, '1234567890');
	});
	// debug(input);
	expect(input.value).toStrictEqual('(123) 456-7890');
});

test('this form is accessile', async () => {
	let {container} = render(
		<Formik>
			<MuiPhoneInput name='phone' label='Phone Number' type='text' />
		</Formik>,
	);
	const results = await axe(container);
	expect(results).toHaveNoViolations();
});
