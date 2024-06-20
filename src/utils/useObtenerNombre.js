/**
 * Módulo que proporciona funciones para obtener nombres y colores asociados
 * a identificadores de dependencias y estados de solicitudes.
 * @module useObtenerNombre
 */
import {
	optionsDependencias,
	optionsEstados,
	optionsRole,
	optionscanal,
} from './options';
/**
 * Hook personalizado que proporciona funciones para obtener nombres y colores
 * asociados a identificadores de dependencias y estados de solicitudes.
 * @returns {Object} Objeto que contiene las funciones para obtener nombres y colores.
 */
const useObtenerNombre = () => {
	/**
	 * Función para obtener el nombre asociado a un ID en un conjunto de opciones.
	 * @param {Array<Object>} options - Conjunto de opciones.
	 * @param {string} id - ID del elemento del cual se quiere obtener el nombre.
	 * @returns {string} Nombre asociado al ID, o 'Desconocido' si no se encuentra.
	 */
	const obtenerNombre = (options, id) => {
		const itemEncontrado = options.find(item => item.id === id.toString());
		return itemEncontrado ? itemEncontrado.nombre : 'Desconocido';
	};

	/**
	 * Función para obtener el nombre de la dependencia asociada a un ID.
	 * @param {number} id - ID de la dependencia.
	 * @returns {string} Nombre de la dependencia, o 'Desconocido' si no se encuentra.
	 */
	const obtenerNombreDependencia = id => {
		return obtenerNombre(optionsDependencias, id);
	};
	/**
	 * Función para obtener el nombre del estado asociado a un ID.
	 * @param {number} id - ID del estado.
	 * @returns {string} Nombre del estado, o 'Desconocido' si no se encuentra.
	 */
	const obtenerNombreEstado = id => {
		return obtenerNombre(optionsEstados, id);
	};
	const obtenerNombreCanal = id => {
		return obtenerNombre(optionscanal, id);
	};
	const obtenerNombreRole = id => {
		return obtenerNombre(optionsRole, id);
	};
	/**
	 * Función para obtener el color asociado a un ID de estado.
	 * @param {number} id - ID del estado.
	 * @returns {string} Color asociado al ID, o 'gray' si no se encuentra.
	 */
	const obtenerColorEstado = id => {
		const colores = {
			1: 'bg-blue-zodiac-500/20',
			2: 'bg-yellow-500/10',
			3: 'bg-green-500/50',
			4: 'green',
		};
		return colores[id] || 'gray';
	};

	return {
		obtenerNombreDependencia,
		obtenerNombreEstado,
		obtenerColorEstado,
		obtenerNombreCanal,
		obtenerNombreRole,
	};
};

export default useObtenerNombre;
