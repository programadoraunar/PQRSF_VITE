import React, { useEffect, useRef, useState } from 'react';
import { optionsDependencias, optionsSolicitud } from '../../utils/options';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { solicitudAnonimaSchema } from '../../validations/formSchema';
import { RiCloseCircleFill } from '@remixicon/react';
// import { registrarSolicitudAnonima } from '../../supabase/actions/solicitudesFuntions';
import {
	obtnerUltimoRadicado,
	registrarSolicitudAnonima,
} from '../../supabase/actions/pqrsfFunctions';
import Modal from './Modal';
import Loading from '../ui/Loading';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from '../pdf/Pdf';

/**
 * @component FormularioAnonimo
 * @description Componente que representa un formulario para enviar solicitudes anónimas.
 * @param {Function} onClose - Función para cerrar el formulario.
 */
function FormularioAnonimo({ onClose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		getValues,
	} = useForm({
		resolver: zodResolver(solicitudAnonimaSchema),
	});

	// Referencia para la animación de GSAP
	const ref = useRef(null);

	// Efecto para animar la entrada del formulario
	useEffect(() => {
		if (ref.current) {
			gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.6 });
		}
	}, []);

	// Estado local para manejar los datos de la descripcion
	const [formData, setFormData] = useState({
		description: '',
		// adjunto: null,
	});

	const [numeroRadicado, setNumeroRadicado] = useState();
	const [fechaRadicado, setFechaRadicado] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [valores, setValores] = useState({
		tipoSolicitud: '',
		dependencia: '',
		description: '',
	});

	// Manejador de cambio para los campos del formulario, se manejan los caracteres
	// del campo descipcion
	const handleChange = e => {
		const { name, value } = e.target;

		// Limpiar el valor eliminando caracteres especiales
		const cleanedValue = value.replace(/[^\w\s]/gi, '');

		setFormData(prevData => ({
			...prevData,
			[name]: cleanedValue,
		}));
	};
	const [mostrarModal, setMostrarModal] = useState(false);

	const handleMostrarModal = () => {
		setMostrarModal(true);
	};

	const handleCerrarModal = () => {
		setMostrarModal(false);
	};

	// Manejador de envío del formulario
	const onSubmit = async dato => {
		try {
			setIsLoading(true); // Establecer isLoading en true antes de realizar la consulta
			// Convertir las ID a números enteros
			const idtipoSolicitud = dato.tipoSolicitud;
			const idDependencia = parseInt(dato.dependencia, 10);
			const descripcionData = dato.description;

			// Llamar a la función registrarSolicitudAnonima con los datos del formulario
			const data = await registrarSolicitudAnonima(
				idtipoSolicitud,
				idDependencia,
				descripcionData,
			);

			// Registro exitoso
			console.log('Solicitud anónima registrada con éxito:', data);
			try {
				const dataRadicado = await obtnerUltimoRadicado();
				setNumeroRadicado(dataRadicado.id_radicado);
				console.log(
					'fecha de radicado que llega de base de datos' +
						dataRadicado.fecha_hora_radicacion,
				);
				const fechaFormateada = new Date(
					dataRadicado.fecha_hora_radicacion,
				).toLocaleString('es-CO', { timeZone: 'America/Bogota' });
				setFechaRadicado(fechaFormateada);
				console.log('fecha formateada ' + fechaFormateada);
				// console.log(fechaFormateada);

				// Obtener los valores del formulario
				const valoresFormulario = getValues();
				console.log(valoresFormulario);
				setValores({
					tipoSolicitud: valoresFormulario.tipoSolicitud,
					dependencia: valoresFormulario.dependencia,
					description: valoresFormulario.description,
				});
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
				handleMostrarModal();
			}
		} catch (err) {
			// Manejo de errores
			console.error('Error durante el envío de la solicitud:', err);
		}
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				ref={ref}
				className='relative border-2 border-blue-zodiac-900 rounded-lg py-5 my-5 px-4 shadow-xl flex flex-col bg-white'
			>
				<h1 className='text-blue-zodiac-900 text-center text-2xl font-gothicBold'>
					Solicitudes Anónimas
				</h1>
				<button
					type='button'
					className='text-black cursor-pointer absolute top-0 right-0 mt-2 mr-2'
					onClick={onClose}
				>
					<RiCloseCircleFill size={32} />
				</button>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='mb-4 mt-8 text-base lg:text-base text-blue-zodiac-950 text-start'>
						Tipo de Solicitud
					</div>
					<select
						className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
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
					<div className='mb-4 mt-8 text-base text-blue-zodiac-950 text-start'>
						Dependencia
					</div>
					<select
						className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer'
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
							className='text-blue-zodiac-950 hover:border-blue-zodiac-950'
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
			</motion.div>
		</AnimatePresence>
	);
}

FormularioAnonimo.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default FormularioAnonimo;
