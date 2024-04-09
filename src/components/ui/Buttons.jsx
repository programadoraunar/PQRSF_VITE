import React from 'react';
import { Button } from '@tremor/react';
import PropTypes from 'prop-types';
function Buttons({ onClick, children, className, icon }) {
	return (
		<div className='flex justify-center'>
			<Button onClick={onClick} className={`buttonsFontSize ${className}`}>
				<span className='text-white'>{icon}</span>
				{children}
			</Button>
		</div>
	);
}
Buttons.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.node.isRequired, // Validar children
	className: PropTypes.string,
	icon: PropTypes.node,
};
export default Buttons;
