import React from 'react';
import { RiCloseCircleFill } from '@remixicon/react';
import PropTypes from 'prop-types';
function Modal({ children, onClose }) {
	return (
		<div className='w-full  h-full fixed top-0 left-0 bg-slate-500 bg-opacity-50 flex justify-center items-center '>
			<div className='w-[500px] min-h-[100px] bg-white relative p-5'>
				<h1 className='text-black'>Modal</h1>
				<button className='absolute top-0 right-0 p-2' onClick={onClose}>
					<RiCloseCircleFill className='text-black' />
				</button>
				{children}
			</div>
		</div>
	);
}
Modal.propTypes = {
	children: PropTypes.node.isRequired, // `children` debe ser un nodo y es obligatorio
	onClose: PropTypes.func.isRequired,
};

export default Modal;
