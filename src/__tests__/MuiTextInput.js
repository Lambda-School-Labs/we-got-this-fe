import React from 'react';
import ReactDOM from 'react-dom';
import {render, fireEvent, act, wait, waitForElement} from 'providers';
// import {render, act} from '@testing-library/react';
// import {getQueriesForElement, fireEvent} from '@testing-library/dom';

import {Formik, Form} from 'formik';
import MuiTextInput from '../components/formItems/MuiTextInput';

test('it renders', () => {
	let {debug, getByLabelText} = render(
		<Formik>
			<MuiTextInput name='username' label='User Name' type='text' />
		</Formik>,
	);
	let input = getByLabelText(/User Name/i);
	expect(input).toHaveAttribute('type', 'text');
	// debug();
});
