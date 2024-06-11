import { supabase } from "../client";

export async function obtenerInformeGeneral(tipoInforme) {
	try {
		// Llamar a la función para actualizar el estado de la solicitud
		const { data, error } = await supabase.rpc('informe_general', {
			tipo_informe: tipoInforme,
		});

		if (error) {
			console.log(error);
			// Manejar error si ocurre durante la llamada a la función RPC de actualización
			console.error('Error al obtener los datos:', error);
			throw new Error('Error al obtener los datos.');
		} else {
			// Actualización exitosa
			return data;
		}
	} catch (err) {
		// Manejar error en la llamada a la función RPC
		console.error(
			'Error al llamar a la función RPC:',
			err,
		);
		throw new Error(
			'Error al llamar a la función RPC.',
		);
	}
}