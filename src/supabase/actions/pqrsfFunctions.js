import { supabase } from '../client';

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

/**
 * Obtiene las PQRSF filtradas por fechas y tipo de anonimato.
 *
 * @param {number} cantidadRegistros - La cantidad de registros a obtener.
 * @param {string} fechaDesde - La fecha de inicio del rango de fechas (YYYY-MM-DD).
 * @param {string} fechaHasta - La fecha de fin del rango de fechas (YYYY-MM-DD).
 * @param {boolean} esAnonima - Si las PQRSF son anónimas.
 * @returns {Promise<Object[]>} - Una promesa que resuelve a los registros obtenidos.
 * @throws {Error} - Si hay un error al obtener las solicitudes.
 */
export async function obtenerPqrsfPorFechas(
	cantidadRegistros,
	fechaDesde,
	fechaHasta,
	esAnonima,
) {
	try {
		const { data, error } = await supabase.rpc('obtener_pqrsf_por_fechas', {
			cantidad_registros: cantidadRegistros,
			fecha_desde: fechaDesde,
			fecha_hasta: fechaHasta,
			es_anonima_param: esAnonima,
		});

		if (error) {
			console.error('Error al obtener las solicitudes:', error);
			throw new Error('Error al obtener las solicitudes.');
		} else {
			return data;
		}
	} catch (err) {
		console.error('Error al llamar a la función RPC:', err);
		throw new Error('Error al llamar a la función RPC.');
	}
}

/**
 * Obtiene las PQRSF filtradas por fechas, tipo de anonimato y tipo de solicitud.
 *
 * @param {number} cantidadRegistros - La cantidad de registros a obtener.
 * @param {string} fechaDesde - La fecha de inicio del rango de fechas (YYYY-MM-DD).
 * @param {string} fechaHasta - La fecha de fin del rango de fechas (YYYY-MM-DD).
 * @param {boolean} esAnonima - Si las PQRSF son anónimas.
 * @param {string} tipoSolicitud - El tipo de solicitud PQRSF.
 * @returns {Promise<Object[]>} - Una promesa que resuelve a los registros obtenidos.
 * @throws {Error} - Si hay un error al obtener las solicitudes.
 */
export async function obtenerPqrsfPorFechasYTipo(
	cantidadRegistros,
	fechaDesde,
	fechaHasta,
	esAnonima,
	tipoSolicitud,
) {
	try {
		const { data, error } = await supabase.rpc(
			'obtener_pqrsf_por_fechas_y_tipo',
			{
				cantidad_registros: cantidadRegistros,
				fecha_desde: fechaDesde,
				fecha_hasta: fechaHasta,
				es_anonima_param: esAnonima,
				tipo_solicitud_param: tipoSolicitud,
			},
		);

		if (error) {
			console.error('Error al obtener las solicitudes:', error);
			throw new Error('Error al obtener las solicitudes.');
		} else {
			return data;
		}
	} catch (err) {
		console.error('Error al llamar a la función RPC:', err);
		throw new Error('Error al llamar a la función RPC.');
	}
}

/**
 * Obtiene las PQRSF filtradas por fechas, tipo de anonimato, tipo de solicitud y estado.
 *
 * @param {number} cantidadRegistros - La cantidad de registros a obtener.
 * @param {string} fechaDesde - La fecha de inicio del rango de fechas (YYYY-MM-DD).
 * @param {string} fechaHasta - La fecha de fin del rango de fechas (YYYY-MM-DD).
 * @param {boolean} esAnonima - Si las PQRSF son anónimas.
 * @param {number} estado - El estado de la solicitud.
 * @param {string} tipoSolicitud - El tipo de solicitud PQRSF.
 * @returns {Promise<Object[]>} - Una promesa que resuelve a los registros obtenidos.
 * @throws {Error} - Si hay un error al obtener las solicitudes.
 */
export async function obtenerPqrsfPorFechasYTipoYEstado(
	cantidadRegistros,
	fechaDesde,
	fechaHasta,
	esAnonima,
	tipoSolicitud,
	estado,
) {
	try {
		const { data, error } = await supabase.rpc(
			'obtener_pqrsf_por_fechas_tipo_y_estado',
			{
				cantidad_registros: cantidadRegistros,
				fecha_desde: fechaDesde,
				fecha_hasta: fechaHasta,
				es_anonima_param: esAnonima,
				tipo_solicitud_param: tipoSolicitud,
				id_estado_param: estado,
			},
		);

		if (error) {
			console.error('Error al obtener las solicitudes:', error);
			throw new Error('Error al obtener las solicitudes.');
		} else {
			return data;
		}
	} catch (err) {
		console.error('Error al llamar a la función RPC:', err);
		throw new Error('Error al llamar a la función RPC.');
	}
}

/**
 * Fetches PQRSF details based on the given ID_Radicado.
 *
 * @param {string} idRadicado - The UUID of the ID_Radicado to fetch details for.
 * @returns {Promise<{data: any, error: any}>} - A promise that resolves with the fetched data or an error.
 */
export const getPqrsfDetails = async idRadicado => {
	try {
		const { data, error } = await supabase.rpc('get_pqrsf_details', {
			p_id_radicado: idRadicado,
		});

		if (error) {
			console.error('Error fetching PQRSF details:', error.message);
			return { data: null, error };
		}
		return { data, error: null };
	} catch (err) {
		console.error('Unexpected error:', err.message);
		return { data: null, error: err };
	}
};
/**
 * Counts the number of PQRSF records grouped by their status.
 * @async
 * @returns {Promise<{ data: object, error: string }>} An object containing the counts data and any potential error message.
 */
export const countPqrsfByStatus = async () => {
	try {
		const { data, error } = await supabase.rpc('count_pqrsf_by_status');

		if (error) {
			console.error('Error fetching PQRSF counts:', error.message);
			return { data: null, error };
		}
		return { data, error: null };
	} catch (err) {
		console.error('Unexpected error:', err.message);
		return { data: null, error: err };
	}
};
