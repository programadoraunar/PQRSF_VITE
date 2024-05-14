import React, { useState } from 'react';
import { optionsDependencias, optionsSolicitud } from '../../../utils/options';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { solicitudAnonimaSchema } from '../../../validations/formSchema';
// import { registrarSolicitudAnonima } from '../../supabase/actions/solicitudesFuntions';
import {
	obtnerUltimoRadicado,
	registrarSolicitudAnonima,
} from '../../../supabase/actions/pqrsfFunctions';
import Modal from '../ui/Modal';
import Loading from '../../ui/Loading';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from '../../pdf/Pdf';

/**
 * @component FormularioAnonimo
 * @description Componente que representa un formulario para enviar solicitudes anónimas.
 * @param {Function} onClose - Función para cerrar el formulario.
 */
function FormularioAnonimo() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
	} = useForm({
		resolver: zodResolver(solicitudAnonimaSchema),
	});
	// Estado local para manejar los datos de la descripcion
	const [formData, setFormData] = useState({
		description: '',
	});

	// Estado local para manejar el número y la fecha de radicado
	const [numeroRadicado, setNumeroRadicado] = useState();
	const [fechaRadicado, setFechaRadicado] = useState();
	// Estado local para manejar el estado de carga
	const [isLoading, setIsLoading] = useState(false);
	// Estado local para manejar los valores del formulario
	const [valores, setValores] = useState({
		tipoSolicitud: '', // Estado para el tipo de solicitud
		dependencia: '', // Estado para la dependencia
		description: '', // Estado para la descripción
	});

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

	// Manejador de envío del formulario
	const onSubmit = async dato => {
		try {
			setIsLoading(true);

			const idtipoSolicitud = dato.tipoSolicitud;
			const idDependencia = parseInt(dato.dependencia, 10);
			const descripcionData = dato.description;

			const data = await registrarSolicitudAnonima(
				idtipoSolicitud,
				idDependencia,
				descripcionData,
			);
			console.log(data);
			const dataRadicado = await obtnerUltimoRadicado();
			const fechaFormateada = new Date(
				dataRadicado.fecha_hora_radicacion,
			).toLocaleString('es-CO', { timeZone: 'America/Bogota' });

			setNumeroRadicado(dataRadicado.id_radicado);
			setFechaRadicado(fechaFormateada);

			const valoresFormulario = getValues();
			setValores({
				tipoSolicitud: valoresFormulario.tipoSolicitud,
				dependencia: valoresFormulario.dependencia,
				description: valoresFormulario.description,
			});
		} catch (err) {
			console.error('Error durante el envío de la solicitud:', err);
		} finally {
			setIsLoading(false);
			handleMostrarModal();
		}
	};

	return (
		<div className='border-2 border-blue-zodiac-950 my-5 shadow-xl flex flex-col bg-white'>
			<div className='bg-blue-zodiac-950 py-3'>
				<h1 className='text-center text-lg font-gothicBold text-white'>
					Solicitudes Anónimas
				</h1>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className='px-3 py-3 '>
				<div className='mb-4 text-base lg:text-base font-gothicBold text-blue-zodiac-950 text-start'>
					Tipo de Solicitud
				</div>
				<select
					className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer bg-white'
					{...register('tipoSolicitud')}
					onChange={e => {
						setValue('tipoSolicitud', e.target.value);
					}}
					value={formData.dependencia}
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
				<div className='mb-4 mt-8 text-base text-blue-zodiac-950 font-gothicBold text-start'>
					Dependencia
				</div>
				<select
					className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer bg-white'
					{...register('dependencia')}
					onChange={e => {
						console.log('Valor seleccionado:', e.target.value);
						setValue('dependencia', e.target.value);
					}}
				>
					{optionsDependencias.map((dependencia, index) => (
						<option key={index} value={dependencia.id}>
							{dependencia.nombre}
						</option>
					))}
				</select>
				{errors.dependencia && (
					<p className='text-red-500'>{errors.dependencia.message}</p>
				)}

				<div className='flex flex-col'>
					<label
						htmlFor='description'
						className='text-base py-2 text-blue-zodiac-950 text-start'
					>
						Descripción
					</label>
					<textarea
						className='text-blue-zodiac-950 hover:border-blue-zodiac-950 bg-white'
						id='description'
						placeholder='Comienza a escribir aquí...'
						rows={6}
						{...register('description')}
						value={formData.description}
						onChange={handleChange}
					/>
					{errors.description && (
						<p className='text-red-500'>{errors.description.message}</p>
					)}
				</div>
				<button
					type='submit'
					className='mt-4 px-4 py-2 bg-blue-zodiac-900 hover:bg-blue-zodiac-950 text-white rounded-lg'
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
							<Modal
								onClose={handleCerrarModal}
								dependencia={valores.dependencia}
								tipoSolicitud={valores.tipoSolicitud}
								descripcion={valores.description}
								isLoading={isLoading}
							>
								<div className='flex flex-col gap-3 mb-5'>
									<h2 className='font-gothicBold'>Numero de Radicado:</h2>
									{numeroRadicado}

									<h2 className='font-gothicBold'>Fecha de Radicacion:</h2>
									{fechaRadicado}
								</div>

								<PDFDownloadLink
									className='bg-blue-zodiac-900 text-white p-2 border rounded-lg hover:bg-blue-zodiac-950 cursor-pointer'
									document={
										<Pdf
											tipoSolicitud={valores.tipoSolicitud}
											dependencia={valores.dependencia}
											descripcion={valores.description}
											numeroRadicado={numeroRadicado}
											fechaRadicado={fechaRadicado}
										/>
									}
									fileName='documento.pdf'
								>
									{({ blob, url, loading, error }) =>
										loading ? 'Cargando documento...' : 'Descargar PDF'
									}
								</PDFDownloadLink>
							</Modal>
						</motion.div>
					)
				)}
			</AnimatePresence>
		</div>
	);
}

export default FormularioAnonimo;
