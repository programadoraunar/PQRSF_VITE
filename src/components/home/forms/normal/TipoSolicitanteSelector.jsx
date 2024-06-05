// TipoSolicitanteSelector.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { optionsFacultad, optionsProgramas } from '../../../../utils/options';
function TipoSolicitanteSelector({
	register,
	handleChangeTipoSolicitante,
	esEstudiante,
	esDocente,
	errors,
}) {
	const [error, setError] = useState('');

	const handleChange = e => {
		let value = e.target.value.trim(); // Eliminar espacios en blanco al inicio y al final
		if (value === '' || isNaN(value)) {
			setError('Ingrese un número válido');
		} else if (parseInt(value, 10) < 1 || parseInt(value, 10) > 10) {
			setError('El semestre debe estar entre 1 y 10');
			// Si el valor es mayor que 10, lo borramos
			if (parseInt(value, 10) > 10) {
				value = '';
			}
		} else {
			setError('');
		}
		// Actualizar el valor del input
		e.target.value = value;
	};
	return (
		<div>
			<div className='mb-4 mt-4 text-blue-zodiac-950 text-start'>
				Tipo de Solicitante
			</div>
			<select
				className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer bg-white'
				{...register('tipoSolicitante')}
				onChange={handleChangeTipoSolicitante}
			>
				<option key={1} value=''></option>
				<option key={2} value='Estudiante'>
					Estudiante
				</option>
				<option key={3} value='Docente'>
					Docente
				</option>
			</select>
			{esEstudiante && (
				<>
					<div className='p-4'>
						<div className='flex flex-col w-full lg:w-[85%]'>
							<label className='py-2 text-blue-zodiac-950 text-start'>
								Programa
							</label>
							<select
								className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer bg-white'
								{...register('programa')}
							>
								{optionsProgramas.map(programa => (
									<option key={programa.id} value={programa.nombre}>
										{programa.nombre}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className='p-4'>
						<div className='flex flex-col w-full lg:w-[85%]'>
							<label className='py-2 text-blue-zodiac-950 text-start'>
								Semestre
							</label>
							<input
								className='text-blue-zodiac-950 hover:border-blue-zodiac-950 bg-white'
								placeholder='Ingrese su semestre'
								type='text'
								{...register('semestre')}
								onChange={handleChange}
							/>
						</div>
						{error && <p className='text-red-500'>{error}</p>}
					</div>
				</>
			)}
			{esDocente && (
				<>
					<div className='p-4'>
						<div className='flex flex-col w-full lg:w-[85%]'>
							<label className='py-2 text-blue-zodiac-950 text-start'>
								Facultad
							</label>
							<select
								className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer bg-white'
								{...register('facultad')}
							>
								{optionsFacultad.map(facultad => (
									<option key={facultad.id} value={facultad.nombre}>
										{facultad.nombre}
									</option>
								))}
							</select>
						</div>
						{/* Aquí podrías agregar la lógica de validación y los errores */}
						{errors.facultad && (
							<p className='text-red-500'>{errors.facultad.message}</p>
						)}
					</div>
				</>
			)}
		</div>
	);
}
TipoSolicitanteSelector.propTypes = {
	register: PropTypes.func.isRequired, // Función de registro de react-hook-form
	handleChangeTipoSolicitante: PropTypes.func.isRequired, // Función de cambio de tipo de solicitante
	esEstudiante: PropTypes.bool.isRequired, // Indica si el solicitante es estudiante
	esDocente: PropTypes.bool.isRequired, // Indica si el solicitante es docente
	errors: PropTypes.object.isRequired, // Objeto de errores de react-hook-form
};

export default TipoSolicitanteSelector;
