import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { obtenerUltimos7Registros } from '../../../supabase/actions/pqrsfFunctions';
import Loading from '../../ui/Loading';
import { optionsDependencias, optionsEstados } from '../../../utils/options';

/**
 * Componente de tabla que muestra los últimos registros.
 * @component
 * @returns {JSX.Element} Elemento de tabla de React.
 */
function Tabla() {
	const [isLoading, setIsLoading] = useState(false);
	const [datos, setDatos] = useState([]);

	useEffect(() => {
		/**
		 * Función asincrónica para obtener los últimos registros.
		 * @async
		 * @function fetchData
		 */
		async function fetchData() {
			setIsLoading(true);
			try {
				const nuevosDatos = await obtenerUltimos7Registros();
				setDatos(nuevosDatos);
			} catch (error) {
				console.error(
					'Error al obtener los últimos 7 registros:',
					error.message,
				);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, []);

	/**
	 * Función para obtener el nombre de la dependencia basado en su ID.
	 * @param {string} idDependencia - ID de la dependencia.
	 * @returns {string} Nombre de la dependencia.
	 */
	const obtenerNombreDependencia = idDependencia => {
		const dependenciaEncontrada = optionsDependencias.find(
			dep => dep.id === idDependencia.toString(),
		);
		return dependenciaEncontrada
			? dependenciaEncontrada.nombre
			: 'Dependencia Desconocida';
	};

	/**
	 * Función para obtener el nombre del estado basado en su ID.
	 * @param {string} idEstado - ID del estado.
	 * @returns {string} Nombre del estado.
	 */
	const obtenerNombreEstados = idEstado => {
		const estadoEncontrado = optionsEstados.find(
			est => est.id === idEstado.toString(),
		);
		return estadoEncontrado ? estadoEncontrado.nombre : 'Estado Desconocida';
	};

	return (
		<div>
			<div className='overflow-x-auto bg-white border-t-4 border-blue-zodiac-950 text-black'>
				<table className='table'>
					<thead className='text-black font-gothicBold text-base'>
						<tr>
							<th></th>
							<th>Dependencia</th>
							<th>Fecha De Envio</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
						{!isLoading && Array.isArray(datos) && datos.length > 0 ? (
							datos.map((dato, index) => (
								<tr key={dato.id_pqrsf}>
									<th>{index + 1}</th>
									<td>{obtenerNombreDependencia(dato.id_dependencia)}</td>
									<td>{dato.fecha_envio}</td>
									<td>{obtenerNombreEstados(dato.id_estado)}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan='4'>
									{isLoading ? <Loading /> : 'No hay datos disponibles'}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

// PropTypes
Tabla.propTypes = {
	datos: PropTypes.array, // Datos de los registros
	isLoading: PropTypes.bool, // Estado de carga
};

export default Tabla;
