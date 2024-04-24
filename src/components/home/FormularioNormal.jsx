import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { RiCloseCircleFill } from '@remixicon/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { gsap } from 'gsap';
import { solicitudNormalesSchema } from '../../validations/formSchema';
import {
	optionscanal,
	optionsDependencias,
	optionsSolicitud,
	optionsIdentificacion,
} from '../../utils/options';

/**
 * @component FormularioNormal
 * @description Componente que representa un formulario para enviar solicitudes normales.
 * @param {Function} onClose - Función para cerrar el formulario.
 */

function FormularioNormal({ onClose }) {
	const ref = useRef(null);
	const [formData, setFormData] = useState({
		description: '',
		nombre: '',
		apellido: '',
		segundoApellido: '',
		direccion: '',
		celular: '',
		/* adjunto: null, */
	});
	useEffect(() => {
		if (ref.current) {
			gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
		}
	}, []);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(solicitudNormalesSchema),
	});

	const handleChange = e => {
		const { name, value } = e.target;
		const cleanedValue = value.replace(/[^\w\s]/gi, ''); // Elimina caracteres especiales
		setFormData(prevData => ({
			...prevData,
			[name]: cleanedValue,
		}));
	};

	const onSubmit = data => {
		console.log(data);
	};
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				ref={ref}
				className='relative border-2 border-blue-zodiac-800 rounded-lg py-5 my-5 px-4 shadow-xl flex flex-col  bg-white'
			>
				<h1 className='text-blue-zodiac-900 text-center font-gothicBold text-2xl py-2'>
					Solicitudes Normales
				</h1>
				<button
					type='button'
					className='text-black cursor-pointer absolute top-0 right-0 mt-2 mr-2' // Posicionamiento absoluto en la esquina superior derecha
					onClick={onClose}
				>
					<RiCloseCircleFill size={32} />
				</button>

				<form>
					<div>
						<section id='infoSolicitante' className='flex flex-col text-black'>
							<h1 className='font-gothicBold'>Informacion del Solicitante</h1>
							<div className='mb-4 mt-4 text-blue-zodiac-950 text-start'>
								Tipo de Identificacion
							</div>
							<label className='text-blue-zodiac-950 text-start'>
								Seleccione Tipo de Solicitante
							</label>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='bg-blue-300 p-4'>Contenido 1</div>
								<div className='bg-blue-300 p-4'>Contenido 2</div>
								<div className='bg-blue-300 p-4'>Contenido 3</div>
								<div className='bg-blue-300 p-4'>Contenido 4</div>
							</div>
						</section>
					</div>
				</form>
			</motion.div>
		</AnimatePresence>
	);
}
FormularioNormal.propTypes = {
	onClose: PropTypes.func,
};
export default FormularioNormal;
