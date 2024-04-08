import React from 'react';
import { Button } from '@tremor/react';
import PropTypes from 'prop-types';
function Buttons({ onClick, children }) {
	return (
		<div className='flex justify-center'>
			<Button
				onClick={onClick}
				className='bg-blue-zodiac-900 hover:bg-blue-950'
			>
				{children}
			</Button>
		</div>
	);
}
Buttons.propTypes = {
	title: PropTypes.string, // ajusta el tipo según lo que esperas para solicitud
};
export default Buttons;
