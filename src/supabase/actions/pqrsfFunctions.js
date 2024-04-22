import { supabase } from '../client';

/**
 * @function registrarSolicitudAnonima
 * @description Registra una solicitud anónima utilizando una función RPC en la base de datos.
 * @param {number} tipoSolicitud - El tipo de solicitud (Petición, Queja, Reclamo, Sugerencia o Felicitación).
 * @param {number} idDependencia - El ID de la dependencia asociada a la solicitud.
 * @param {number} idCanal - El ID del canal de respuesta.
 * @param {string} descripcionText - La descripción de la solicitud.
 * @returns {Promise<void>} - Promesa que se resuelve cuando la operación finaliza.
 */
export async function registrarSolicitudAnonima(
	tipoSolicitud,
	idDependencia,
	idCanal,
	descripcionText,
) {
	try {
		// Llamar a la función RPC 'insertar_pqrsf_anonima' en la base de datos
		const { data, error } = await supabase.rpc('insertar_pqrsf_anonima', {
			descripcion: descripcionText,
			id_canal: idCanal,
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
