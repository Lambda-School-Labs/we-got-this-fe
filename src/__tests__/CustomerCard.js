import React from 'react';
import {render} from '@testing-library/react';
import CustomerCard from '../scenes/Customer/components/CustomerCard';

const customer = {
	img:
		'https://news.artnet.com/app/news-upload/2015/03/2B153A81-B28C-F6E3-B8426862A893A8B9-1024x608.jpg',
	name: 'Drake',
	contact: {
		phone: '(832) 832-1902',
	},
	locations: [
		{
			address: {
				street: 'My Street',
				city: 'Houston',
				state: 'TX',
				zipcode: 77077,
			},
		},
	],
};

//
//Mock actions
jest.mock('../state/customer/customerActions', () => {
	return {
		getCustomerImage: jest.fn((dispatch, docId) => {}),
	};
});

//
//Mock State
jest.mock('../state', () => {
	return {
		useStateValue: jest.fn(() => [{}, () => {}]),
	};
});

//
//Mock component
jest.mock('../scenes/Customer/components/CustomerImage', () => {
	return {
		__esModule: true,
		default: jest.fn(() => null),
	};
});

describe('Customer Card component', () => {
	it('Renders', () => {
		const {debug} = render(<CustomerCard customer={customer} />);
		debug();
	});
});
