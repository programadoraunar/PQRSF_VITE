import { supabase } from '../client';

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
