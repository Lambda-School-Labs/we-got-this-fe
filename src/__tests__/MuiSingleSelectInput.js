import React from 'react';
import userEvent from '@testing-library/user-event';
import {render, fireEvent, act, wait, waitForElement} from 'providers';
// import {render, act} from '@testing-library/react';
// import {getQueriesForElement, fireEvent} from '@testing-library/dom';

import {Formik, Form} from 'formik';
import MuiSingleSelectInput from '../components/formItems/MuiSingleSelectInput';

let customers = [
	{
		id: 1234,
		displayName: 'Nathie',
	},
	{
		id: 4543,
		displayName: 'Mike VR Oasis',
	},
];

//
//This test doesn't work... something with the way Material UI does their display of the MenuItem is weird
test('it renders', () => {
	let {debug, getByLabelText} = render(
		<Formik initialValues={{customer: ''}}>
			<Form>
				<MuiSingleSelectInput
					data={customers}
					name='customer'
					label='Customers'
					valueKey='id'
					displayKey='displayName'
				/>
			</Form>
		</Formik>,
	);
	let input = getByLabelText(/customer/i);
	// userEvent.selectOptions(input, ['Nathie']);
	fireEvent.click(input);
	// expect(input.value).toBe(1234);
	// debug(input);
});
