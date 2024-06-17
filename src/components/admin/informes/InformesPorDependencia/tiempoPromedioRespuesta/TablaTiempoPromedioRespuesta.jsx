import React from 'react';
import useObtenerNombre from '../../../../../utils/useObtenerNombre';
import PropTypes from 'prop-types';

function TablaTiempoPromedioRespuesta({ data }) {
	const { obtenerNombreDependencia } = useObtenerNombre();
	// Verificar si los datos están presentes y no están vacíos
	if (!data || !Array.isArray(data.resultado) || data.resultado.length === 0) {
		return <p>No hay datos disponibles.</p>;
	}
	return (
		<div className='overflow-x-auto'>
			<table className='min-w-full divide-y divide-gray-200'>
				<thead className='bg-gray-50'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							Dependencia
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							PQRSF Sin Respuesta
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
						>
							Tiempo Promedio de Respuesta (días)
						</th>
					</tr>
				</thead>
				<tbody className='bg-white divide-y divide-gray-200'>
					{data.resultado.map((item, index) => (
						<tr key={index}>
							<td className='px-6 py-4 whitespace-nowrap'>
								{obtenerNombreDependencia(item.dependencia)}
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								{item.sin_respuesta}
							</td>
							<td className='px-6 py-4 whitespace-nowrap'>
								{item.tiempo_promedio_respuesta !== null
									? item.tiempo_promedio_respuesta
									: 'N/A'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
TablaTiempoPromedioRespuesta.propTypes = {
	data: PropTypes.shape({
		resultado: PropTypes.arrayOf(
			PropTypes.shape({
				dependencia: PropTypes.number.isRequired,
				sin_respuesta: PropTypes.number.isRequired,
				tiempo_promedio_respuesta: PropTypes.oneOfType([
					PropTypes.string,
					PropTypes.oneOf([null]),
				]),
			}),
		).isRequired,
	}).isRequired,
};
export default TablaTiempoPromedioRespuesta;
