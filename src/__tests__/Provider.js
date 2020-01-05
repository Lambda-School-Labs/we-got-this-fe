import React from 'react';
import {StateProvider} from '../state';
import {MemoryRouter} from 'react-router-dom';
import {render} from '@testing-library/react';

const mainReducer = (state, action) => {
	let {payload} = action;
	switch (action.type) {
		default:
			return {...state};
	}
};

const initialState = {
	auth: {},
	customers: {},
	teams: {},
	techs: {},
	jobs: {},
};

export const StateConsumer = ({children}) => {
	return (
		<StateProvider reducer={mainReducer} initialState={initialState}>
			<MemoryRouter>{children}</MemoryRouter>
		</StateProvider>
	);
};

test('it renders', () => {
	const {debug} = render(
		<StateConsumer>
			<h1>Hello!</h1>
		</StateConsumer>,
	);
});

export default StateConsumer;
