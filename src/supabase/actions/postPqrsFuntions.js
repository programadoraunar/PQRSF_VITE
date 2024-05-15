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
			return data;
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
