import React, { useState, useRef } from 'react';
import {
	optionsDependencias,
	optionsSolicitud,
	optionsSede,
} from '../../../utils/options';
import ReCAPTCHA from 'react-google-recaptcha';
import { retCaptchaUrl } from '../../../reCaptcha/reCaptcha';
import {
	emailJsPublicKey,
	emailJsService,
	emailJsTemplate,
} from '../../../emailjs/emailJs';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { solicitudAnonimaSchema } from '../../../validations/formSchema';
// import { registrarSolicitudAnonima } from '../../supabase/actions/solicitudesFuntions';
import {
	registrarSolicitudAnonima,
	subirArchivo,
} from '../../../supabase/actions/postPqrsFuntions';
import emailjs from '@emailjs/browser';
import Modal from '../ui/Modal';
import Loading from '../../ui/Loading';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from '@/components/pdf/Pdf';
import { obtnerUltimoRadicado } from '../../../supabase/actions/pqrsfFunctions';
import { v4 as uuidv4 } from 'uuid';

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
	const captcha = useRef(null);
	const [captchaCompleted, setCaptchaCompleted] = useState(true); // Estado para controlar si el ReCAPTCHA se ha completado
	// Estado local para manejar el número y la fecha de radicado
	const [numeroRadicado, setNumeroRadicado] = useState();
	const [fechaRadicado, setFechaRadicado] = useState();
	// Estado local para manejar el estado de carga
	const [isLoading, setIsLoading] = useState(false);
	const [file, setFile] = useState(null);
	// Estado local para manejar los valores del formulario
	const [valores, setValores] = useState({
		tipoSolicitud: '', // Estado para el tipo de solicitud
		dependencia: '', // Estado para la dependencia
		description: '', // Estado para la descripción
		sede: '',
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

		if (captcha.current.getValue()) {
			setCaptchaCompleted(true); // Actualiza el estado cuando el ReCAPTCHA se ha completado
		}
	};
	// Estado local para mostrar el modal
	const [mostrarModal, setMostrarModal] = useState(false);
	const handleFileChange = e => {
		setFile(e.target.files[0]);
	};
	// Manejador para mostrar el modal
	const handleMostrarModal = () => {
		setMostrarModal(true);
	};
	// Manejador para cerrar el modal y limpiar el formulario
	const handleCerrarModal = e => {
		setValue('tipoSolicitud', ''); // Limpiar el valor del campo tipoSolicitud
		setValue('dependencia', ''); // Limpiar el valor del campo dependencia
		setValue('description', ''); // Limpiar el valor del campo description
		setValue('sede', '');
		setMostrarModal(false); // Ocultar el modal
	};

	const sendEmail = async () => {
		try {
			await emailjs.send(
				emailJsService,
				emailJsTemplate,
				{},
				{
					publicKey: emailJsPublicKey,
				},
			);
			console.log('SUCCESS!');
		} catch (err) {
			if (err) {
				console.log('EMAILJS FAILED...', err);
				return;
			}

			console.log('ERROR', err);
		}
	};

	// Manejador de envío del formulario
	const onSubmit = async dato => {
		if (captcha.current.getValue()) {
			try {
				setIsLoading(true);

				const idtipoSolicitud = dato.tipoSolicitud;
				const idDependencia = parseInt(dato.dependencia, 10);
				const descripcionData = dato.description;
				const sedeText = dato.sede;
				let urlArchivo = null;

				if (file) {
					const archivoUuid = uuidv4();
					const nombreArchivoUnico = `${archivoUuid}_${file.name}`;

					const { data: archivoData, error: archivoError } = await subirArchivo(
						file,
						nombreArchivoUnico,
					);
					if (archivoError) {
						throw new Error('Error al subir el archivo:', archivoError);
					}
					urlArchivo = `public/${nombreArchivoUnico}`;
					console.log(urlArchivo);
				}

				const resultado = await registrarSolicitudAnonima(
					idtipoSolicitud,
					idDependencia,
					descripcionData,
					sedeText,
					urlArchivo,
				);
				console.log(resultado);
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
					sede: valoresFormulario.sede,
				});
				console.log(file);
				sendEmail();
			} catch (err) {
				console.error('Error durante el envío de la solicitud:', err);
			} finally {
				setIsLoading(false);
				handleMostrarModal();
			}
		} else {
			setCaptchaCompleted(false);
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
				<div className='mb-4 mt-8 text-base text-blue-zodiac-950 font-gothicBold text-start'>
					Sede
				</div>
				<select
					className='w-full text-blue-zodiac-900 border-2 py-2 hover:border-blue-zodiac-950 cursor-pointer bg-white'
					{...register('sede')}
					onChange={e => {
						console.log('Valor seleccionado:', e.target.value);
						setValue('sede', e.target.value);
					}}
				>
					{optionsSede.map((sede, index) => (
						<option key={index} value={sede.nombre}>
							{sede.nombre}
						</option>
					))}
				</select>
				{errors.sede && <p className='text-red-500'>{errors.sede.message}</p>}

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
				<div className='flex flex-col py-4'>
					<input
						type='file'
						className='file-input file-input-bordered file-input-sm w-full max-w-xs'
						{...register('archivo')}
						onChange={handleFileChange}
					/>
					{errors.archivo && (
						<p className='text-red-500'>{errors.archivo.message}</p>
					)}
				</div>
				<div>
					<ReCAPTCHA
						ref={captcha}
						sitekey={retCaptchaUrl}
						onChange={handleChange}
					/>
					{!captchaCompleted && (
						<p className='text-red-500'>Por favor, complete el ReCAPTCHA.</p>
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
								sede={valores.sede}
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
											sede={valores.sede}
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
