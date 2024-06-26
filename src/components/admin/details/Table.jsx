import React from 'react';
import PropTypes from 'prop-types';
import useObtenerNombre from '../../../utils/useObtenerNombre';

function Table({ data }) {
	const { obtenerNombreDependencia, obtenerNombreCanal } = useObtenerNombre();
	return (
		<div className='overflow-x-auto mt-8 lg:text-lg '>
			<table className='table text-black bg-white'>
				{/* head */}
				<thead>
					<tr className='text-base bg-blue-zodiac-950 text-white'>
						<th>Fecha Envio</th>
						<th>Fecha Asignacion</th>
						<th>Fecha Respuesta</th>
						<th>Descripcion</th>
						<th>Dependecia</th>
						<th>Canal</th>
					</tr>
				</thead>
				<tbody>
					{/* row 1 */}
					<tr className=' bg-white'>
						<td>{data.fecha_envio}</td>
						<td>
							{data.fecha_asignacion
								? data.fecha_asignacion
								: 'Fecha no asignada'}
						</td>
						<td>
							{data.fecha_respuesta
								? data.fecha_respuesta
								: 'Fecha no asignada'}
						</td>
						<td>{data.descripcion}</td>
						<td>{obtenerNombreDependencia(data.id_dependencia)}</td>
						<td>{obtenerNombreCanal(data.id_canal)}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
Table.propTypes = {
	data: PropTypes.shape({
		fecha_envio: PropTypes.string.isRequired,
		fecha_asignacion: PropTypes.string,
		fecha_respuesta: PropTypes.string,
		descripcion: PropTypes.string.isRequired,
		id_dependencia: PropTypes.string.isRequired,
		id_canal: PropTypes.string.isRequired,
	}).isRequired,
};

export default Table;
