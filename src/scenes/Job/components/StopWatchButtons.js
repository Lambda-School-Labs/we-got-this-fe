import React from 'react';

function StopWatchButtons(props) {
	return (
		<div>
			{props.status === 0 ? (
				<button
					className='stopwatch-btn stopwatch-btn-gre'
					onClick={props.start}
				>
					Start
				</button>
			) : (
				''
			)}

			{props.status === 1 ? (
				<div>
					<button
						className='stopwatch-btn stopwatch-btn-red'
						onClick={props.stop}
					>
						Stop
					</button>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default StopWatchButtons;
