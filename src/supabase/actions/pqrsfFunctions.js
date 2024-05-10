import { supabase } from '../client';

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
) {
	try {
		// Llamar a la función RPC 'insertar_pqrsf_anonima' en la base de datos
		const { data, error } = await supabase.rpc('insertar_pqrsf_anonima', {
			descripcion: descripcionText,
			id_dependencia: idDependencia,
			tipo_solicitud_pqrs: tipoSolicitud,
		});

		if (error) {
			// Manejar error si ocurre durante la llamada a la función RPC
			console.error('Error al registrar solicitud anónima:', error);
		} else {
			// Registro exitoso
			console.log('Solicitud anónima registrada con éxito:', data);
		}
	} catch (err) {
		// Manejar error en la llamada a la función RPC
		console.error('Error al llamar a la función RPC:', err);
	}
}

/**
 * Obtiene el último radicado de la base de datos.
 * @async
 * @function obtenerUltimoRadicado
 * @returns {Promise<Object>} El último radicado.
 * @throws {Error} Error al llamar a la función RPC o al obtener el radicado.
 * @example
 * const ultimoRadicado = await obtenerUltimoRadicado();
 * console.log(ultimoRadicado); // { id_radicado: '...', fecha_hora_radicacion: '...' }
 */
export async function obtnerUltimoRadicado() {
	try {
		// Llamar a la función RPC 'obtener_ultimo_radicado' en la base de datos
		const { data, error } = await supabase.rpc('obtener_ultimo_radicado');

		if (error) {
			// Manejar error si ocurre durante la llamada a la función RPC
			console.error('Error al obtener Radicado:', error);
			throw new Error('Error al obtener el radicado.');
		} else {
			// Registro exitoso
			return data[0];
		}
	} catch (err) {
		// Manejar error en la llamada a la función RPC
		console.error('Error al llamar a la función RPC:', err);
		throw new Error('Error al llamar a la función RPC.');
	}
}
/**
 * Función asincrónica para obtener los últimos 7 registros de la tabla 'pqrsf' en Supabase.
 * @returns {Promise<Object>} Un objeto que contiene los datos de los últimos 7 registros.
 * @throws {Error} Si ocurre un error durante la llamada a la función RPC.
 * @throws {Error} Si no se pueden obtener los registros correctamente.
 * // Ejemplo de uso:
 * try {
 *     const registros = await obtenerUltimos7Registros();
 *     console.log('Últimos 7 registros:', registros);
 * } catch (error) {
 *     console.error('Error al obtener los últimos 7 registros:', error.message);
 * }
 */
export async function obtenerUltimos7Registros() {
	try {
		// Llamar a la función RPC 'obtener_ultimo_radicado' en la base de datos
		const { data, error } = await supabase.rpc('obtener_ultimos_7_registros');
		if (error) {
			// Manejar error si ocurre durante la llamada a la función RPC
			console.error('Error al obtener las solicitudes:', error);
			throw new Error('Error al obtener las solicitudes.');
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

export async function obtenerNumeroRegistros() {
	try {
		// Llamar a la función RPC 'obtener_ultimo_radicado' en la base de datos
		const { data, error } = await supabase.rpc('obtenernumeroregistros');
		console.log(data);
		if (error) {
			// Manejar error si ocurre durante la llamada a la función RPC
			console.error('Error al obtener el total de solicitudes:', error);
			throw new Error('Error al obtener el total de solicitudes.');
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
