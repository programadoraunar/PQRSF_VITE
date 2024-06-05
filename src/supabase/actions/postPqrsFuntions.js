/**
 * Módulo que contiene funciones post para interactuar con la base de datos
 * relacionadas con las PQRSF (Peticiones, Quejas, Reclamos, Sugerencias, Felicitaciones).
 * @module postPqrsfFunctions
 */

import { supabase } from '../client';

/**
 * Actualiza el estado de una solicitud en la base de datos.
 * @param {number} idPqrsf - ID de la solicitud que se va a actualizar.
 * @param {number} nuevoEstado - Nuevo estado que se asignará a la solicitud.
 * @returns {Promise<string>} Mensaje de éxito si la actualización es exitosa.
 * @throws {Error} Si hay un error durante la actualización del estado de la solicitud.
 */
export async function actualizarEstadoSolicitud(idPqrsf, nuevoEstado) {
	try {
		// Llamar a la función para actualizar el estado de la solicitud
		const { data, error } = await supabase.rpc('actualizar_estado_pqrsf', {
			id_pqrsf_param: idPqrsf,
			nuevo_estado: nuevoEstado,
		});

		if (error) {
			console.log(error);
			// Manejar error si ocurre durante la llamada a la función RPC de actualización
			console.error('Error al actualizar estado de solicitud:', error);
			throw new Error('Error al actualizar estado de solicitud.');
		} else {
			// Actualización exitosa
			return data || 'Estado actualizado con éxito';
		}
	} catch (err) {
		// Manejar error en la llamada a la función RPC
		console.error(
			'Error al llamar a la función RPC para actualizar estado de solicitud:',
			err,
		);
		throw new Error(
			'Error al llamar a la función RPC para actualizar estado de solicitud.',
		);
	}
}
/**
 * Registra una solicitud normal de un alumno en la base de datos.
 * @param {string} tipoIdentificacion - Tipo de identificación del alumno.
 * @param {string} documentNumber - Número de documento del alumno.
 * @param {string} nombresUsu - Nombres del alumno.
 * @param {string} apellidoUsu - Apellido del alumno.
 * @param {string} segundoApellidoUsu - Segundo apellido del alumno.
 * @param {string} direccionUsu - Dirección del alumno.
 * @param {string} celularUsu - Número de celular del alumno.
 * @param {string} emailUsu - Correo electrónico del alumno.
 * @param {string} tipoSolicitud - Tipo de solicitud.
 * @param {number} dependencia - ID de la dependencia.
 * @param {number} canal - ID del canal de comunicación.
 * @param {string} descripcionText - Descripción de la solicitud.
 * @param {string} programaText - Programa del alumno (solo para alumnos).
 * @param {string} semestreText - Semestre del alumno (solo para alumnos).
 * @returns {Promise<Object>} Datos de la solicitud registrada.
 * @throws {Error} Si hay un error durante el registro de la solicitud.
 */
export async function registrarSolicitudNormalAlumno(
	tipoIdentificacion,
	documentNumber,
	nombresUsu,
	apellidoUsu,
	segundoApellidoUsu,
	direccionUsu,
	celularUsu,
	emailUsu,
	tipoSolicitud,
	dependencia,
	canal,
	descripcionText,
	programaText,
	semestreText,
	sedeText,
	urlAdjuntoText,
) {
	try {
		// Llamar a la función RPC 'registrar_pqrsf_normal_alumno' en la base de datos
		const { data, error } = await supabase.rpc(
			'registrar_pqrsf_normal_alumno',
			{
				tipo_identificacion: tipoIdentificacion,
				document_number: documentNumber,
				nombres: nombresUsu,
				apellido: apellidoUsu,
				segundo_apellido: segundoApellidoUsu,
				direccion: direccionUsu,
				celular: celularUsu,
				email: emailUsu,
				tipo_solicitud_pqrsf: tipoSolicitud,
				id_dependencia: dependencia,
				id_canal: canal,
				descripcion: descripcionText,
				programa: programaText,
				semestre: semestreText,
				sede: sedeText,
				url_adjunto: urlAdjuntoText,
			},
		);

		if (error) {
			// Manejar error si ocurre durante la llamada a la función RPC
			console.error('Error al registrar solicitud normal:', error);
			throw new Error('Error al registrar solicitud normal.');
		} else {
			// Registro exitoso
			return data;
		}
	} catch (err) {
		// Manejar error en la llamada a la función RPC
		console.error('Error al llamar a la función RPC:', err);
		throw new Error('Error al llamar a la función RPC.');
	}
}
/**
 * Registra una solicitud normal de un docente en la base de datos.
 * @param {string} tipoIdentificacion - Tipo de identificación del docente.
 * @param {string} documentNumber - Número de documento del docente.
 * @param {string} nombresUsu - Nombres del docente.
 * @param {string} apellidoUsu - Apellido del docente.
 * @param {string} segundoApellidoUsu - Segundo apellido del docente.
 * @param {string} direccionUsu - Dirección del docente.
 * @param {string} celularUsu - Número de celular del docente.
 * @param {string} emailUsu - Correo electrónico del docente.
 * @param {string} tipoSolicitud - Tipo de solicitud.
 * @param {number} dependencia - ID de la dependencia.
 * @param {number} canal - ID del canal de comunicación.
 * @param {string} descripcionText - Descripción de la solicitud.
 * @param {string} facultadText - Facultad del docente (solo para docentes).
 * @returns {Promise<Object>} Datos de la solicitud registrada.
 * @throws {Error} Si hay un error durante el registro de la solicitud.
 */
export async function registrarSolicitudNormalDocente(
	tipoIdentificacion,
	documentNumber,
	nombresUsu,
	apellidoUsu,
	segundoApellidoUsu,
	direccionUsu,
	celularUsu,
	emailUsu,
	tipoSolicitud,
	dependencia,
	canal,
	descripcionText,
	facultadText,
	sedeText,
	urlAdjuntoText,
) {
	try {
		// Llamar a la función RPC 'registrar_pqrsf_normal_docente' en la base de datos
		const { data, error } = await supabase.rpc(
			'registrar_pqrsf_normal_docente',
			{
				tipo_identificacion: tipoIdentificacion,
				document_number: documentNumber,
				nombres: nombresUsu,
				apellido: apellidoUsu,
				segundo_apellido: segundoApellidoUsu,
				direccion: direccionUsu,
				celular: celularUsu,
				email: emailUsu,
				tipo_solicitud_pqrsf: tipoSolicitud,
				id_dependencia: dependencia,
				id_canal: canal,
				descripcion: descripcionText,
				facultad: facultadText,
				sede: sedeText,
				url_adjunto: urlAdjuntoText,
			},
		);

		if (error) {
			// Manejar error si ocurre durante la llamada a la función RPC
			console.error('Error al registrar solicitud normal para docente:', error);
			throw new Error('Error al registrar solicitud normal para docente.');
		} else {
			// Registro exitoso
			return data;
		}
	} catch (err) {
		// Manejar error en la llamada a la función RPC
		console.error('Error al llamar a la función RPC para docente:', err);
		throw new Error('Error al llamar a la función RPC para docente.');
	}
}
/**
 * Registra una solicitud normal en la base de datos.
 * @param {string} tipoIdentificacion - Tipo de identificación del usuario.
 * @param {string} documentNumber - Número de documento del usuario.
 * @param {string} nombresUsu - Nombres del usuario.
 * @param {string} apellidoUsu - Apellido del usuario.
 * @param {string} segundoApellidoUsu - Segundo apellido del usuario.
 * @param {string} direccionUsu - Dirección del usuario
 * @param {string} celularUsu - Número de celular del usuario.
 * @param {string} emailUsu - Correo electrónico del usuario.
 * @param {string} tipoSolicitud - Tipo de solicitud.
 * @param {number} dependencia - ID de la dependencia.
 * @param {number} canal - ID del canal de comunicación.
 * @param {string} descripcionText - Descripción de la solicitud.
 * @returns {Promise<Object>} Datos de la solicitud registrada.
 * @throws {Error} Si hay un error durante el registro de la solicitud.
 */
export async function registrarSolicitudNormal(
	tipoIdentificacion,
	documentNumber,
	nombresUsu,
	apellidoUsu,
	segundoApellidoUsu,
	direccionUsu,
	celularUsu,
	emailUsu,
	tipoSolicitud,
	dependencia,
	canal,
	descripcionText,
) {
	try {
		console.log({
			apellido: apellidoUsu,
			celular: celularUsu,
			descripcion: descripcionText,
			direccion: direccionUsu,
			document_number: documentNumber,
			email: emailUsu,
			id_canal: canal,
			id_dependencia: dependencia,
			nombres: nombresUsu,
			segundo_apellido: segundoApellidoUsu,
			tipo_identificacion: tipoIdentificacion,
			tipo_solicitud_pqrsf: tipoSolicitud,
		});

		// Llamar a la función RPC 'obtener_ultimo_radicado' en la base de datos
		const { data, error } = await supabase.rpc('registrar_usuario_y_pqrsf', {
			apellido: apellidoUsu,
			celular: celularUsu,
			descripcion: descripcionText,
			direccion: direccionUsu,
			document_number: documentNumber,
			email: emailUsu,
			id_canal: canal,
			id_dependencia: dependencia,
			nombres: nombresUsu,
			segundo_apellido: segundoApellidoUsu,
			tipo_identificacion: tipoIdentificacion,
			tipo_solicitud_pqrsf: tipoSolicitud,
		});
		console.log(data);
		if (error) {
			// Manejar error si ocurre durante la llamada a la función RPC
			console.error('Error al registrar solicitud normal:', error);
			throw new Error('Error al registrar solicitud normal.');
		} else {
			// Registro exitoso
			return data;
		}
	} catch (err) {
		// Manejar error en la llamada a la función RPC
		console.error('Error al llamar a la función RPC:', err);
		throw new Error('Error al llamar a la función RPC.');
	}
}

/**
 * @function registrarSolicitudAnonima
 * @description Registra una solicitud anónima utilizando una función RPC en la base de datos.
 * @param {number} tipoSolicitud - El tipo de solicitud (Petición, Queja, Reclamo, Sugerencia o Felicitación).
 * @param {number} idDependencia - El ID de la dependencia asociada a la solicitud.
 * @param {string} descripcionText - La descripción de la solicitud.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la operación finaliza.
 */
export async function registrarSolicitudAnonima(
	tipoSolicitud,
	idDependencia,
	descripcionText,
	sedeText,
	urlAdjuntoText,
) {
	try {
		// Llama a la función RPC 'insertar_pqrsf_anonima' en la base de datos
		const { data, error } = await supabase.rpc('registrar_pqrsf_anonima', {
			descripcion: descripcionText,
			id_dependencia: idDependencia,
			sede: sedeText,
			tipo_solicitud_pqrs: tipoSolicitud,
			url_adjunto: urlAdjuntoText,
		});

		if (error) {
			// Maneja el error si ocurre durante la llamada a la función RPC
			console.error('Error al registrar solicitud anónima:', error);
			return { error };
		} else {
			// Si no hay errores, retorna los datos
			console.log('Solicitud anónima registrada con éxito:', data);
			return { data };
		}
	} catch (err) {
		// Maneja el error en la llamada a la función RPC
		console.error('Error al llamar a la función RPC:', err);
		return { error: err.message };
	}
}

export async function subirArchivo(archivo, nombrePersonalizado) {
	if (!archivo) {
		throw new Error('No se ha proporcionado ningún archivo.');
	}

	const nombreArchivo = nombrePersonalizado || archivo.name;
	const { data, error } = await supabase.storage
		.from('archivos')
		.upload(`public/${nombreArchivo}`, archivo);

	if (error) {
		console.error('Error al subir el archivo:', error);
		throw error; // Propaga el error para manejarlo en la llamada de esta función
	}

	console.log('Archivo subido con éxito:', data);
	return data; // Devuelve los datos de la subida para su uso posterior
}
