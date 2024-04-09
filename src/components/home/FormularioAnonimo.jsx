import React from 'react';
import Buttons from '../ui/Buttons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { solicitudAnonimaSchema } from '../../validations/formSchema';
const optionsDependencias = [
	'Rectoría',
	'Secretaría General',
	'Contabilidad',
	'Tesorería',
	'Revisoría Fiscal',
	'Virtual',
	'Jurídica',
	'Vicerrectoría Administrativa',
	'Vicerrectoría Financiera',
	'Sistemas',
	'Bienestar',
	'Biblioteca',
	'Enfermería',
	'Mercadeo',
	'Registro y Control',
	'Crédito y Cartera',
	'Recepción',
	'Internacionalización',
	'Laboratorio Mecánica',
	'Laboratorio Electrónica',
	'Coordinación Administración',
	'Coordinación Contaduría',
	'Coordinación Diseño de Modas',
	'Coordinación Mecánica Dental',
	'Coordinación Ingeniería Informática',
];
const optionsSolicitud = [
	'Peticion',
	'Queja',
	'Reclamo',
	'Suguerencia',
	'Felicitacion',
];

function FormularioAnonimo() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(solicitudAnonimaSchema),
	});
	const onSubmit = data => {
		console.log(data);
	};
	return (
		<div className='border-2 border-blue-zodiac-800 rounded-lg py-5 my-5 px-4 shadow-xl flex flex-col  bg-white'>
			<h1 className='text-blue-zodiac-900 text-center text-2xl lg:text-3xl font-semibold '>
				Solicitudes Anonimas
			</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='mb-4 mt-8 text-base lg:text-[17px] text-blue-zodiac-950 text-start font-medium'>
					Tipo de Solicitud
				</div>
				<select
					className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
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

				<div className='mb-4 mt-8 text-base text-blue-zodiac-950 text-start font-medium'>
					Dependencia
				</div>
				<select
					className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
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

				<div className='flex flex-col'>
					<label
						htmlFor='description'
						className='text-base py-2 text-blue-zodiac-950 text-start font-medium'
					>
						Description
					</label>
					<textarea
						className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
						id='description'
						placeholder='Start typing here...'
						rows={6}
						{...register('description')}
					/>
					{errors.description && (
						<p className='text-red-500'>{errors.description.message}</p>
					)}
				</div>

				<input
					type='file'
					className='border text-black border-gray-300 p-2 rounded-md'
					{...register('adjunto')}
				/>
				{errors.adjunto && (
					<p className='text-red-500'>{errors.adjunto.message}</p>
				)}

				<Buttons type='submit'>Enviar</Buttons>
			</form>
		</div>
	);
}

export default FormularioAnonimo;
