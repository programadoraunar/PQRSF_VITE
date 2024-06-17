import React from 'react';
import useObtenerNombre from '../../../../../utils/useObtenerNombre';
import PropTypes from 'prop-types';

function TablaEstadoPorDependencia({ data }) {
	const { obtenerNombreDependencia, obtenerNombreEstado } = useObtenerNombre();
	if (!data || !Array.isArray(data.resultado) || data.resultado.length === 0) {
		return <p>No hay datos disponibles</p>;
	}
	return (
		<div className='p-4 shadow-md rounded-lg overflow-hidden'>
			<h2 className='text-lg font-bold mb-4'>
				Tabla de Total de PQRSF por dependecia segun su Estado
			</h2>
			<div className='overflow-x-auto'>
				<table className='table-auto w-full border-collapse border border-gray-200'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border border-gray-300 px-4 py-2'>Dependencia</th>
							<th className='border border-gray-300 px-4 py-2'>
								{obtenerNombreEstado(1)}
							</th>
							<th className='border border-gray-300 px-4 py-2'>
								{obtenerNombreEstado(2)}
							</th>
							<th className='border border-gray-300 px-4 py-2'>
								{obtenerNombreEstado(3)}
							</th>
						</tr>
					</thead>
					<tbody>
						{data.resultado.map(item => (
							<tr
								key={`${item.dependencia}-${item.estado}`}
								className='text-center'
							>
								<td className='border border-gray-300 px-4 py-2'>
									{obtenerNombreDependencia(item.dependencia)}
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									{item.estado === 1 ? item.total_pqrsf : '-'}
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									{item.estado === 2 ? item.total_pqrsf : '-'}
								</td>
								<td className='border border-gray-300 px-4 py-2'>
									{item.estado === 3 ? item.total_pqrsf : '-'}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
TablaEstadoPorDependencia.propTypes = {
	data: PropTypes.shape({
		resultado: PropTypes.arrayOf(
			PropTypes.shape({
				estado: PropTypes.number.isRequired,
				dependencia: PropTypes.number.isRequired,
				total_pqrsf: PropTypes.number.isRequired,
			}),
		).isRequired,
	}).isRequired,
};
export default TablaEstadoPorDependencia;
