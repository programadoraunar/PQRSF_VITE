import { supabase } from '../client';

/**
 * Obtiene PQRSF (Peticiones, Quejas, Reclamos, Sugerencias y Felicitaciones)
 * por ID de dependencia.
 * @async
 * @param {number} idDependencia - El ID de la dependencia para la cual se desea obtener las PQRSF.
 * @returns {Promise<{ data: any, error: any }>} Un objeto que contiene los datos obtenidos y cualquier error que haya ocurrido.
 */
export const obtenerPqrsPorDependencia = async idDependencia => {
	try {
		const { data, error } = await supabase.rpc(
			'obtener_pqrsf_por_dependencia',
			{
				id_de_la_dependencia: idDependencia,
			},
		);

		if (error) {
			console.error('Error al obtener PQRSF de la dependencia:', error.message);
			return { data: null, error };
		}
		return { data, error: null };
	} catch (err) {
		console.error('Error inesperado:', err.message);
		return { data: null, error: err };
	}
};

/**
 * Obtiene los detalles de una PQRSF (Peticiones, Quejas, Reclamos, Sugerencias y Felicitaciones)
 * por su ID de radicado.
 * @async
 * @param {number} idRadicado - El ID de radicado de la PQRSF para la cual se desean obtener los detalles.
 * @returns {Promise<{ data: any, error: any }>} Un objeto que contiene los datos de los detalles obtenidos y cualquier error que haya ocurrido.
 */
export const obtenerDetallesPqrsfDependencia = async idRadicado => {
	try {
		const { data, error } = await supabase.rpc(
			'obtener_detalle_pqrsf_dependencia',
			{
				id_radicado_param: idRadicado,
			},
		);

		if (error) {
			console.error(
				'Error al obtener los detalles de la PQRSF:',
				error.message,
			);
			return { data: null, error };
		}
		return { data, error: null };
	} catch (err) {
		console.error('Error inesperado:', err.message);
		return { data: null, error: err };
	}
};
