import React from 'react';
import { RiCloseCircleFill } from '@remixicon/react';
import PropTypes from 'prop-types';
function Modal({ children, onClose }) {
	return (
		<div className=''>
			<div className='w-[400px] lg:w-[500px] min-h-[100px] bg-white relative p-5'>
				<h1 className='text-black'>Resumen Solicitud</h1>
				<button className='absolute top-0 right-0 p-2' onClick={onClose}>
					<RiCloseCircleFill className='text-black' />
				</button>
				<div className='text-black'>{children}</div>
			</div>
		</div>
	);
}
Modal.propTypes = {
	children: PropTypes.node.isRequired, // `children` debe ser un nodo y es obligatorio
	onClose: PropTypes.func.isRequired,
};

export default Modal;
