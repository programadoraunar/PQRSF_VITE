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



/**
 * Descarga un archivo del almacenamiento de Supabase desde una carpeta específica.
 * 
 * @async
 * @param {string} folder - La carpeta desde la cual se desea descargar el archivo.
 * @param {string} fileName - El nombre del archivo a descargar.
 * @returns {Promise<{data: Blob, error: any}>} Un objeto que contiene el archivo descargado como un Blob, o un error en caso de fallo.
 * @throws {Error} Si ocurre un error inesperado durante la descarga del archivo.
 * 
 * @example
 * // Uso de la función para descargar un archivo y manejar el resultado
 * descargarArchivo('folder', 'avatar1.png')
 *   .then(({ data, error }) => {
 *     if (error) {
 *       console.error('Error al descargar el archivo:', error.message);
 *     } else {
 *       // Hacer algo con el archivo descargado
 *       console.log('Archivo descargado:', data);
 *     }
 *   })
 *   .catch(error => {
 *     console.error('Error inesperado al descargar el archivo:', error.message);
 *   });
 */
export const descargarArchivo = async (fileName) => {
	console.log(`${fileName}`);
	try {
	  const { data, error } = await supabase
		.storage
		.from('images') // Asegúrate de que el nombre del bucket es correcto
		.download('public/qr.png');
  
	  if (error) {
		console.error('Error al descargar el archivo:', error.message);
		return { data: null, error };
	  }
	  return { data, error: null };
	} catch (err) {
	  console.error('Error inesperado:', err.message);
	  return { data: null, error: err };
	}
  };
  
