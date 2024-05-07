import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Asegúrate de importar motion desde framer-motion
import PropTypes from 'prop-types';
import { fadeIn } from '../../utils/variants';
const ExpandingButton = ({ buttonText, expandedContent }) => {
	const [expanded, setExpanded] = useState(false);

	const handleClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div>
			<motion.button
				whileHover={{ scale: 1.05 }}
				className={` py-4 px-10 rounded-b-lg bg-blue-zodiac-950 cursor-pointer transition-all duration-300 text-white ${
					expanded ? 'w-full' : 'w-full lg:w-80 '
				}`}
				onClick={handleClick}
			>
				{expanded ? 'Cerrar' : buttonText}
			</motion.button>
			{expanded && (
				<motion.div
					initial='hidden'
					animate='show'
					className='flex justify-center items-center'
					variants={fadeIn('down', 0.3)} // Usa la animación de bajada al abrir el contenido expandido
				>
					{' '}
					<div className='w-full md:w-[650px]'>{expandedContent}</div>
				</motion.div>
			)}
		</div>
	);
};
ExpandingButton.propTypes = {
	buttonText: PropTypes.string.isRequired, // El texto del botón es obligatorio y debe ser una cadena
	expandedContent: PropTypes.node.isRequired, // El contenido expandido puede ser cualquier nodo React y es obligatorio
};
export default ExpandingButton;
