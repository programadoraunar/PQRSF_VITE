import { supabase } from "../client";

/**
 * Obtiene un informe general basado en el tipo de informe proporcionado.
 * 
 * @async
 * @param {string} tipoInforme - El tipo de informe que se desea obtener.
 * @returns {Promise<any>} Una promesa que se resuelve con los datos del informe obtenido.
 * @throws {Error} Si ocurre un error durante la obtención de los datos o la llamada a la función RPC.
 * 
 * @example
 * // Uso de la función para obtener un informe general y manejar el resultado
 * obtenerInformeGeneral('tipoEjemplo')
 *   .then(data => {
 *     console.log('Datos del informe:', data);
 *   })
 *   .catch(error => {
 *     console.error('Error al obtener el informe general:', error.message);
 *   });
 */
export async function obtenerInformeGeneral(tipoInforme) {
	try {
		// Llamar a la función RPC para obtener el informe general
		const { data, error } = await supabase.rpc('informe_general', {
			tipo_informe: tipoInforme,
		});

		if (error) {
			// Manejar error si ocurre durante la llamada a la función RPC
			console.error('Error al obtener los datos:', error);
			throw new Error('Error al obtener los datos.');
		} else {
			// Retornar los datos obtenidos exitosamente
			return data;
		}
	} catch (err) {
		// Manejar error en la llamada a la función RPC
		console.error('Error al llamar a la función RPC:', err);
		throw new Error('Error al llamar a la función RPC.');
	}
}
export async function obtenerInformeDependencias(tipoInforme) {
	try {
		// Llamar a la función RPC para obtener el informe general
		const { data, error } = await supabase.rpc('informe_dependencia', {
			tipo_informe: tipoInforme,
		});

		if (error) {
			// Manejar error si ocurre durante la llamada a la función RPC
			console.error('Error al obtener los datos:', error);
			throw new Error('Error al obtener los datos.');
		} else {
			// Retornar los datos obtenidos exitosamente
			return data;
		}
	} catch (err) {
		// Manejar error en la llamada a la función RPC
		console.error('Error al llamar a la función RPC:', err);
		throw new Error('Error al llamar a la función RPC.');
	}
}
