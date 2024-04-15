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
	tiposIdentificacion,
} from '../../utils/options';
function FormularioNormal({ onClose }) {
	const ref = useRef(null);
	const [formData, setFormData] = useState({
		tipoIdentificacion: '',
		tipoSolicitud: '',
		dependencia: '',
		description: '',
		nombre: '',
		apellido: '',
		direccion: '',
		celular: '',
		email: '',
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
				<h1 className='text-blue-zodiac-900 text-center text-2xl lg:text-3xl font-semibold '>
					Solicitudes Normales
				</h1>
				<button
					type='button'
					className='text-black cursor-pointer absolute top-0 right-0 mt-2 mr-2' // Posicionamiento absoluto en la esquina superior derecha
					onClick={onClose}
				>
					<RiCloseCircleFill size={32} />
				</button>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-4 mt-8 text-base lg:text-lg 2xl:text-xl text-blue-zodiac-950 text-start font-medium'>
						Tipo de Identificacion
					</div>
					<select
						className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer text-base lg:text-lg 2xl:text-xl'
						onChange={handleChange}
						{...register('tipoIdentificacion')}
					>
						{tiposIdentificacion.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
					{errors.tipoIdentificacion && (
						<p className='text-red-500'>{errors.tipoIdentificacion.message}</p>
					)}

					<div className='grid grid-rows-2 grid-cols-2'>
						<div className='flex flex-col w-[50%]'>
							<label className='text-base py-2 text-blue-zodiac-950 text-start font-medium lg:text-lg 2xl:text-xl'>
								Nombre
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950 text-base lg:text-lg 2xl:text-xl'
								placeholder='Ingrese su nombre'
								type='text'
								{...register('nombre')}
								value={formData.nombre}
								onChange={handleChange}
							/>
							{errors.nombre && (
								<p className='text-red-500'>{errors.nombre.message}</p>
							)}
						</div>

						<div className='flex flex-col w-[50%]'>
							<label className='text-base py-2 text-blue-zodiac-950 text-start font-medium lg:text-lg 2xl:text-xl'>
								Apellido
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950 text-base lg:text-lg 2xl:text-xl'
								placeholder='Ingrese su Apellido'
								type='text'
								{...register('apellido')}
								value={formData.apellido}
								onChange={handleChange}
							/>
							{errors.apellido && (
								<p className='text-red-500'>{errors.apellido.message}</p>
							)}
						</div>

						<div className='flex flex-col w-[50%]'>
							<label className='text-base py-2 text-blue-zodiac-950 text-start font-medium lg:text-lg 2xl:text-xl'>
								Direccion
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950 text-base lg:text-lg 2xl:text-xl'
								placeholder='Ingrese su direccion'
								type='text'
								{...register('direccion')}
								onChange={handleChange}
							/>
							{errors.direccion && (
								<p className='text-red-500'>{errors.direccion.message}</p>
							)}
						</div>
						<div className='flex flex-col w-[50%]'>
							<label className='text-base py-2 text-blue-zodiac-950 text-start font-medium lg:text-lg 2xl:text-xl'>
								Celular
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950 text-base lg:text-lg 2xl:text-xl'
								placeholder='Ingrese su Celular'
								type='number'
								{...register('celular')}
								value={formData.celular}
								onChange={handleChange}
							/>
							{errors.celular && (
								<p className='text-red-500'>{errors.celular.message}</p>
							)}
						</div>
					</div>
					<div className='flex flex-col'>
						<label className='text-base py-2 text-blue-zodiac-950 text-start font-medium lg:text-lg 2xl:text-xl'>
							Correo
						</label>
						<input
							className='text-blue-zodiac-950 hover:border-blue-zodiac-950 text-base lg:text-lg 2xl:text-xl'
							placeholder='Ingrese su Correo Electronico'
							type='text'
							{...register('email')}
							onChange={handleChange}
						/>
						{errors.email && (
							<p className='text-red-500'>{errors.email.message}</p>
						)}
					</div>

					<div className='mb-4 mt-8 text-base lg:text-lg 2xl:text-xl text-blue-zodiac-950 text-start font-medium'>
						Tipo de Solicitud
					</div>
					<select
						className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer text-base lg:text-lg 2xl:text-xl'
						onChange={handleChange}
						{...register('tipoSolicitud')}
					>
						{optionsSolicitud.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
					{errors.tipoSolicitud && (
						<p className='text-red-500'>{errors.tipoSolicitud.message}</p>
					)}

					<div className='mb-4 mt-8 text-base text-blue-zodiac-950 text-start font-medium lg:text-lg 2xl:text-xl'>
						Dependencia
					</div>
					<select
						className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer text-base lg:text-lg 2xl:text-xl'
						onChange={handleChange}
						{...register('dependencia')}
					>
						{/* Mapea sobre las opciones y crea un SearchSelectItem para cada una */}
						{optionsDependencias.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
					{errors.dependencia && (
						<p className='text-red-500'>{errors.dependencia.message}</p>
					)}

					<div className='mb-4 mt-8 text-base text-blue-zodiac-950 text-start font-medium lg:text-lg 2xl:text-xl'>
						Canal de Respuesta
					</div>
					<select
						className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer text-base lg:text-lg 2xl:text-xl'
						value={formData.canal}
						onChange={handleChange}
						{...register('canal')}
					>
						{/* Mapea sobre las opciones y crea un SearchSelectItem para cada una */}
						{optionscanal.map((option, index) => (
							<option key={index} value={option}>
								{option}
							</option>
						))}
					</select>
					{errors.dependencia && (
						<p className='text-red-500'>{errors.dependencia.message}</p>
					)}

					<div className='flex flex-col'>
						<label
							htmlFor='description'
							className='text-base py-2 text-blue-zodiac-950 text-start font-medium lg:text-lg 2xl:text-xl'
						>
							Description
						</label>
						<textarea
							className='text-blue-zodiac-950 hover:border-blue-zodiac-950 text-base lg:text-lg 2xl:text-xl'
							id='description'
							placeholder='Start typing here...'
							rows={6}
							{...register('description')}
							value={formData.description}
							onChange={handleChange}
						/>
						{errors.description && (
							<p className='text-red-500'>{errors.description.message}</p>
						)}
					</div>

					{/* <input
						type='file'
						className='border text-black border-gray-300 p-2 rounded-md text-sm lg:text-xl'
						{...register('adjunto')}
					/>
					{errors.adjunto && (
						<p className='text-red-500'>{errors.adjunto.message}</p>
					)} */}

					<button type='submit' className='text-black'>
						Enviar
					</button>
				</form>
			</motion.div>
		</AnimatePresence>
	);
}
FormularioNormal.propTypes = {
	onClose: PropTypes.func,
};
export default FormularioNormal;
