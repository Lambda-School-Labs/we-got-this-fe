import React from 'react';
import {Button} from '@material-ui/core';

function StopWatchButtons(props) {
	return (
		<div>
			{props.status === 0 ? (
				<Button
					variant='contained'
					color='primary'
					onClick={props.start}
				>
					Start
				</Button>
			) : (
				''
			)}

			{props.status === 1 ? (
				<div>
					<Button
						variant='contained'
						color='secondary'
						onClick={props.stop}
					>
						Stop
					</Button>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default StopWatchButtons;
