import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { solicitudNormalesSchema } from '../../../validations/formSchema';
import {
	optionscanal,
	optionsDependencias,
	optionsSolicitud,
	optionsIdentificacion,
} from '../../../utils/options';
import {
	obtnerUltimoRadicado,
	registrarSolicitudNormalAlumno,
	registrarSolicitudNormalDocente,
} from '../../../supabase/actions/pqrsfFunctions';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../../ui/Loading';
import ModalSolicitudNormal from '../ui/ModalSolicitudNormal';
import TipoSolicitanteSelector from './normal/TipoSolicitanteSelector';
/**
 * @component FormularioNormal
 * @description Componente que representa un formulario para enviar solicitudes normales.
 * @param {Function} onClose - Función para cerrar el formulario.
 */

function FormularioNormal() {
	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(solicitudNormalesSchema),
	});

	const [formData, setFormData] = useState({
		description: '',
		/* adjunto: null, */
	});

	// Estado local para manejar el número y la fecha de radicado
	const [numeroRadicado, setNumeroRadicado] = useState();
	const [fechaRadicado, setFechaRadicado] = useState();
	// Estado local para manejar el estado de carga
	const [isLoading, setIsLoading] = useState(false);
	// Manejador de cambio para los campos del formulario solo para campo la descripcion
	const handleChange = e => {
		const { name, value } = e.target;

		// Limpiar el valor eliminando caracteres especiales
		const cleanedValue = value.replace(/[^\w\s]/gi, '');
		// Actualizar el estado del formulario
		setFormData(prevData => ({
			...prevData,
			[name]: cleanedValue,
		}));
	};
	// Estado local para mostrar el modal
	const [mostrarModal, setMostrarModal] = useState(false);
	// Manejador para mostrar el modal
	const handleMostrarModal = () => {
		setMostrarModal(true);
	};
	// Manejador para cerrar el modal y limpiar el formulario
	const handleCerrarModal = () => {
		setValue('tipoSolicitud', ''); // Limpiar el valor del campo tipoSolicitud
		setValue('dependencia', ''); // Limpiar el valor del campo dependencia
		setValue('description', ''); // Limpiar el valor del campo description
		setMostrarModal(false); // Ocultar el modal
	};
	const valoresFormulario = getValues();
	const onSubmit = async data => {
		console.log(data);

		try {
			setIsLoading(true);
			console.log(data);

			const tipoIdentificacion = data.tipoIdentificacion;
			const numeroDocumento = data.documentNumber;
			const nombre = data.nombres;
			const primerApellido = data.apellido;
			const segundoApellido = data.segundoApellido;
			const direccion = data.direccion;
			const celular = data.celular;
			const correo = data.email;
			const idtipoSolicitud = data.tipoSolicitud;
			const idDependencia = parseInt(data.dependencia, 10);
			const descripcionData = data.description;
			const canal = parseInt(data.canal, 10);
			const programa = data.programa;
			const semestre = data.semestre;
			const facultad = data.facultad;
			if (data.tipoSolicitante === 'Docente') {
				try {
					const res = await registrarSolicitudNormalDocente(
						tipoIdentificacion,
						numeroDocumento,
						nombre,
						primerApellido,
						segundoApellido,
						direccion,
						celular,
						correo,
						idtipoSolicitud,
						idDependencia,
						canal,
						descripcionData,
						facultad,
					);
					console.log(res);
					const dataRadicado = await obtnerUltimoRadicado();
					console.log(dataRadicado);
					const fechaFormateada = new Date(
						dataRadicado.fecha_hora_radicacion,
					).toLocaleString('es-CO', { timeZone: 'America/Bogota' });

					setNumeroRadicado(dataRadicado.id_radicado);
					setFechaRadicado(fechaFormateada);
				} catch (error) {
					console.error('Error:', error);
				}
			} else {
				try {
					const res = await registrarSolicitudNormalAlumno(
						tipoIdentificacion,
						numeroDocumento,
						nombre,
						primerApellido,
						segundoApellido,
						direccion,
						celular,
						correo,
						idtipoSolicitud,
						idDependencia,
						canal,
						descripcionData,
						programa,
						semestre,
					);
					console.log(res);

					// Aquí puedes realizar operaciones adicionales después de registrar la solicitud normal
					const dataRadicado = await obtnerUltimoRadicado();
					console.log(dataRadicado);
					const fechaFormateada = new Date(
						dataRadicado.fecha_hora_radicacion,
					).toLocaleString('es-CO', { timeZone: 'America/Bogota' });

					setNumeroRadicado(dataRadicado.id_radicado);
					setFechaRadicado(fechaFormateada);
				} catch (error) {
					console.error('Error:', error);
					// Manejar el error adecuadamente
				}
			}
			handleMostrarModal();
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false);
			handleMostrarModal();
		}
	};

	const [esEstudiante, setEsEstudiante] = useState(false);
	const [esDocente, setEsDocente] = useState(false);

	const handleChangeTipoSolicitante = e => {
		const tipoIdentificacionSeleccionado = e.target.value;

		setEsEstudiante(tipoIdentificacionSeleccionado === 'Estudiante');

		setEsDocente(tipoIdentificacionSeleccionado === 'Docente');
	};
	useEffect(() => {
		// Limpiar campos al cambiar la selección
		if (!esEstudiante) {
			setValue('programa', ''); // Limpiar programa
			setValue('semestre', ''); // Limpiar semestre
		}
		if (!esDocente) {
			setValue('facultad', ''); // Limpiar facultad
		}
	}, [esEstudiante, esDocente]);
	return (
		<div className=' border-2 border-blue-zodiac-950 rounded-lg my-5 shadow-xl flex flex-col  bg-white'>
			<div className='bg-blue-zodiac-950 py-3'>
				<h1 className='text-center text-lg font-gothicBold text-white'>
					Solicitudes Normales
				</h1>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<section id='infoSolicitante' className='flex flex-col text-black '>
					<h1 className='text-center py-3 font-gothicBold '>
						Informacion Solicitante
					</h1>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-2'>
						<div className='p-4'>
							<TipoSolicitanteSelector
								register={register}
								handleChangeTipoSolicitante={handleChangeTipoSolicitante}
								esEstudiante={esEstudiante}
								esDocente={esDocente}
								errors={errors}
							/>
						</div>
						<div className='p-4'>
							<div className='mb-4 mt-4 text-blue-zodiac-950 text-start'>
								Tipo de Identificacion
							</div>
							<select
								className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
								{...register('tipoIdentificacion')}
								onChange={e => {
									console.log('Valor seleccionado:', e.target.value);
									setValue('tipoIdentificacion', e.target.value);
								}}
							>
								{optionsIdentificacion.map((option, index) => (
									<option key={index} value={option.nombre}>
										{option.nombre}
									</option>
								))}
							</select>
							{errors.tipoIdentificacion && (
								<p className='text-red-500'>
									{errors.tipoIdentificacion.message}
								</p>
							)}
						</div>
						<div className='p-4'>
							<div className='flex flex-col w-full lg:w-[85%]'>
								<label className='py-2 text-blue-zodiac-950 text-start'>
									Numero de Documento
								</label>
								<input
									type='text'
									className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
									placeholder='Ingrese su Numero de Documento'
									{...register('documentNumber')}
								/>
							</div>
							{errors.documentNumber && (
								<p className='text-red-500'>{errors.documentNumber.message}</p>
							)}
						</div>
						<div className=' p-4'>
							<div className='flex flex-col w-full lg:w-[85%]'>
								<label className='py-2 text-blue-zodiac-950 text-start'>
									Nombres Del Solicitante
								</label>
								<input
									className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
									placeholder='Ingrese su nombre'
									type='text'
									{...register('nombres')}
									value={formData.nombres}
									onChange={handleChange}
								/>
								{errors.nombres && (
									<p className='text-red-500'>{errors.nombres.message}</p>
								)}
							</div>
						</div>
						<div className='p-4'>
							<div className='flex flex-col w-full lg:w-[85%]'>
								<label className='py-2 text-blue-zodiac-950 text-start'>
									Primer Apellido
								</label>
								<input
									className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
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
						</div>
						<div className=' p-4'>
							<div className='flex flex-col w-full lg:w-[85%]'>
								<label className='py-2 text-blue-zodiac-950 text-start'>
									Segundo Apellido
								</label>
								<input
									className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
									placeholder='Ingrese su Apellido'
									type='text'
									{...register('segundoApellido')}
									value={formData.segundoApellido}
									onChange={handleChange}
								/>
								{errors.segundoApellido && (
									<p className='text-red-500'>
										{errors.segundoApellido.message}
									</p>
								)}
							</div>
						</div>
						<div className='p-4'>
							{' '}
							<div className='flex flex-col w-full lg:w-[85%]'>
								<label className='py-2 text-blue-zodiac-950 text-start'>
									Direccion
								</label>
								<input
									className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
									placeholder='Ingrese su direccion'
									type='text'
									{...register('direccion')}
									onChange={handleChange}
								/>
								{errors.direccion && (
									<p className='text-red-500'>{errors.direccion.message}</p>
								)}
							</div>
						</div>
						<div className='p-4'>
							<div className='flex flex-col w-full lg:w-[85%]'>
								<label className='py-2 text-blue-zodiac-950 text-start'>
									Celular
								</label>
								<input
									className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
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
						<div className='p-4'>
							<div className='flex flex-col'>
								<label className='py-2 text-blue-zodiac-950 text-start'>
									Correo
								</label>
								<input
									className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
									placeholder='Ingrese su Correo Electronico'
									type='text'
									{...register('email')}
									onChange={handleChange}
								/>
								{errors.email && (
									<p className='text-red-500'>{errors.email.message}</p>
								)}
							</div>
						</div>
					</div>
					<h2 className='text-center py-3 font-gothicBold '>
						Informacion Solicitud
					</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-2'>
						<div className='p-4'>
							<div className='mb-4 mt-8 text-blue-zodiac-950 text-start'>
								Tipo de Solicitud
							</div>
							<select
								className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
								{...register('tipoSolicitud')}
								onChange={e => {
									console.log(
										'Valor seleccionado tipoSolicitud:',
										e.target.value,
									);
									setValue('tipoSolicitud', e.target.value);
								}}
							>
								{optionsSolicitud.map((option, index) => (
									<option key={index} value={option.nombre}>
										{option.nombre}
									</option>
								))}
							</select>
							{errors.tipoSolicitud && (
								<p className='text-red-500'>{errors.tipoSolicitud.message}</p>
							)}
						</div>
						<div className='p-4'>
							<div className='mb-4 mt-8 text-blue-zodiac-950 text-start'>
								Dependencia
							</div>
							<select
								className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
								{...register('dependencia')}
								onChange={e => {
									console.log(
										'Valor seleccionado dependencia:',
										e.target.value,
									);
									setValue('dependencia', e.target.value);
								}}
							>
								{/* Mapea sobre las opciones y crea un SearchSelectItem para cada una */}
								{optionsDependencias.map((option, index) => (
									<option key={index} value={option.id}>
										{option.nombre}
									</option>
								))}
							</select>
							{errors.dependencia && (
								<p className='text-red-500'>{errors.dependencia.message}</p>
							)}
						</div>
						<div className='p-4'>
							<div className='mb-4 mt-8 text-blue-zodiac-950 text-start'>
								Canal de Respuesta
							</div>
							<select
								className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
								{...register('canal')}
								onChange={e => {
									console.log('Valor seleccionado:', e.target.value);
									setValue('canal', e.target.value);
								}}
							>
								{/* Mapea sobre las opciones y crea un SearchSelectItem para cada una */}
								{optionscanal.map((option, index) => (
									<option key={index} value={option.id}>
										{option.nombre}
									</option>
								))}
							</select>
							{errors.canal && (
								<p className='text-red-500'>{errors.canal.message}</p>
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
					</div>
					<div className='flex flex-col px-6'>
						<label
							htmlFor='description'
							className='text-base py-2 text-blue-zodiac-950 text-start'
						>
							Description
						</label>
						<textarea
							className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
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
				</section>
				<button
					type='submit'
					className='mt-4 px-4 py-2 m-3 bg-blue-zodiac-900 hover:bg-blue-zodiac-950 text-white rounded-lg'
				>
					Enviar
				</button>
			</form>
			<AnimatePresence>
				{isLoading ? (
					<Loading loadingClassName='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
				) : (
					mostrarModal && (
						<motion.div
							initial={{ opacity: 0, scale: 0.75 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0 }}
							className='w-full  h-full fixed top-0 left-0 bg-slate-500 bg-opacity-50 flex justify-center items-center '
						>
							<ModalSolicitudNormal
								onClose={handleCerrarModal}
								tipoIdentificacion={valoresFormulario.tipoIdentificacion}
								documentNumber={valoresFormulario.documentNumber}
								nombres={valoresFormulario.nombres}
								apellido={valoresFormulario.apellido}
								segundoApellido={valoresFormulario.segundoApellido}
								direccion={valoresFormulario.direccion}
								celular={valoresFormulario.celular}
								email={valoresFormulario.email}
								dependencia={valoresFormulario.dependencia}
								tipoSolicitud={valoresFormulario.tipoSolicitud}
								canal={valoresFormulario.canal}
								descripcion={valoresFormulario.description}
								semestre={valoresFormulario.semestre}
								programa={valoresFormulario.programa}
								numeroRadicado={numeroRadicado}
								fechaRadicado={fechaRadicado}
								isLoading={isLoading}
							>
								<div className='flex flex-col gap-3 mb-5'>
									<h2 className='font-gothicBold'>Numero de Radicado:</h2>
									{numeroRadicado}
									<h2 className='font-gothicBold'>Fecha de Radicacion:</h2>
									{fechaRadicado}
								</div>
							</ModalSolicitudNormal>
						</motion.div>
					)
				)}
			</AnimatePresence>
		</div>
	);
}

export default FormularioNormal;
