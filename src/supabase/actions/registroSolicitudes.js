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
