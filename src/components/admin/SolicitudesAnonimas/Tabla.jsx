import React from 'react';
import PropTypes from 'prop-types';
import { optionsDependencias } from '../../../utils/options';

function Tabla({ datosSolicitudes }) {
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
	return (
		<div className='overflow-x-auto text-black py-5 '>
			<table className='table table-xs bg-white border-t-4  border-blue-zodiac-950'>
				<thead className='text-black text-base font-gothicBold'>
					<tr className='h-16'>
						<th>Id Radicado</th>
						<th>Tipo</th>
						<th>Dependencia</th>
						<th>Descripcion</th>
						<th>Fecha Envio</th>
						<th>Fecha Asignacion</th>
						<th>Fecha de Respuesta</th>
					</tr>
				</thead>
				<tbody>
					{datosSolicitudes.length === 0 ? (
						<tr>
							<td colSpan='7' className='text-center'>
								No hay datos disponibles
							</td>
						</tr>
					) : (
						datosSolicitudes.map(solicitud => (
							<tr key={solicitud.ret_id_pqrsf}>
								<td>{solicitud.ret_id_radicado}</td>
								<td>{solicitud.ret_tipo_solicitud_pqrsf}</td>
								<td>
									{obtenerNombreDependencia(solicitud.ret_id_dependencia)}
								</td>
								<td>{solicitud.ret_descripcion}</td>
								<td>
									{solicitud.ret_fecha_envio
										? solicitud.ret_fecha_envio
										: 'N/A'}
								</td>
								<td>
									{solicitud.ret_fecha_respuesta
										? solicitud.ret_fecha_respuesta
										: 'N/A'}
								</td>
							</tr>
						))
					)}
				</tbody>
				<tfoot className='text-black'>
					<tr>
						<th>Id Radicado</th>
						<th>Tipo</th>
						<th>Dependencia</th>
						<th>Descripcion</th>
						<th>Fecha Envio</th>
						<th>Fecha Asignacion</th>
						<th>Fecha de Respuesta</th>
					</tr>
				</tfoot>
			</table>
		</div>
	);
}
Tabla.propTypes = {
	datosSolicitudes: PropTypes.arrayOf(
		PropTypes.shape({
			ret_id_pqrsf: PropTypes.number,
			ret_id_usuario: PropTypes.string,
			ret_tipo_solicitud_pqrsf: PropTypes.string,
			ret_fecha_envio: PropTypes.string,
			ret_fecha_asignacion: PropTypes.string,
			ret_fecha_respuesta: PropTypes.string,
			ret_descripcion: PropTypes.string,
			ret_id_dependencia: PropTypes.number,
			ret_id_estado: PropTypes.number,
			ret_id_radicado: PropTypes.string,
			ret_id_canal: PropTypes.string,
			ret_es_anonima: PropTypes.bool,
		}),
	).isRequired,
};
export default Tabla;
