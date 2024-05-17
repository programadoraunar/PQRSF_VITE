import { optionsDependencias, optionsEstados } from './options';

const useObtenerNombre = () => {
	const obtenerNombre = (options, id) => {
		const itemEncontrado = options.find(item => item.id === id.toString());
		return itemEncontrado ? itemEncontrado.nombre : 'Desconocido';
	};

	const obtenerNombreDependencia = id => {
		return obtenerNombre(optionsDependencias, id);
	};

	const obtenerNombreEstado = id => {
		return obtenerNombre(optionsEstados, id);
	};
	const obtenerColorEstado = id => {
		const colores = {
			1: 'bg-blue-zodiac-500/20',
			2: 'bg-yellow-500/10',
			3: 'orange',
			4: 'green',
		};
		return colores[id] || 'gray';
	};

	return {
		obtenerNombreDependencia,
		obtenerNombreEstado,
		obtenerColorEstado,
	};
};

export default useObtenerNombre;
