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
		const {container} = render(<CustomerCard customer={customer} />);
		expect(container).toMatchInlineSnapshot(`
		<div>
		  <div
		    class="MuiPaper-root MuiPaper-elevation1 MuiGrid-root MuiGrid-container MuiGrid-item MuiPaper-rounded"
		  >
		    <div
		      class="MuiGrid-root MuiGrid-item"
		    />
		    <div
		      class="MuiGrid-root WithTheme(WithStyles(ForwardRef(Grid)))-root-132 WithTheme(WithStyles(ForwardRef(Grid)))-root-133 MuiGrid-item"
		      theme="[object Object]"
		    >
		      <div
		        class="MuiBox-root MuiBox-root-136 Styled(MuiBox)-root-134"
		      >
		        <h6
		          class="MuiTypography-root MuiTypography-h6"
		        >
		          Drake
		        </h6>
		        <div>
		          <button
		            class="MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeSmall"
		            tabindex="0"
		            type="button"
		          >
		            <span
		              class="MuiIconButton-label"
		            >
		              <svg
		                aria-hidden="true"
		                class="MuiSvgIcon-root"
		                focusable="false"
		                role="presentation"
		                viewBox="0 0 24 24"
		              >
		                <path
		                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
		                />
		              </svg>
		            </span>
		            <span
		              class="MuiTouchRipple-root"
		            />
		          </button>
		        </div>
		      </div>
		      <p>
		        My Street Houston, TX 77077
		      </p>
		      <p>
		        (832) 832-1902
		      </p>
		    </div>
		  </div>
		</div>
	`);
	});
});
