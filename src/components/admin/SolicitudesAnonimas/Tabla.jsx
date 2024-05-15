import React from 'react';
import PropTypes from 'prop-types';
import { optionsDependencias } from '../../../utils/options';
import Loading from '../../ui/Loading';
/**
 * Componente de tabla para mostrar una lista de solicitudes anónimas.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.datosSolicitudes - Array of solicitud objects.
 * @param {boolean} props.isLoading - Boolean indicating if the data is still loading.
 * @returns {JSX.Element} The rendered component.
 */
function Tabla({ datosSolicitudes, isLoading }) {
	const tieneFechaAsignacion = datosSolicitudes.some(
		solicitud => solicitud.ret_fecha_asignacion,
	);
	const tieneFechaRespuesta = datosSolicitudes.some(
		solicitud => solicitud.ret_fecha_respuesta,
	);
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
					<tr className='h-16 text-base'>
						<th>Id Radicado</th>
						<th>Tipo</th>
						<th>Dependencia</th>
						<th>Descripcion</th>
						<th>Fecha Envio</th>
						{tieneFechaAsignacion && <th>Fecha Asignacion</th>}
						{tieneFechaRespuesta && <th>Fecha de Respuesta</th>}
						<th>Asignar</th>
					</tr>
				</thead>
				<tbody>
					{!isLoading ? (
						datosSolicitudes.length === 0 ? (
							<tr>
								<td colSpan='7' className='text-center'>
									No hay datos disponibles
								</td>
							</tr>
						) : (
							datosSolicitudes.map(solicitud => (
								<tr key={solicitud.ret_id_pqrsf}>
									<td className='text-sm'>{solicitud.ret_id_radicado}</td>
									<td className='text-sm'>
										{solicitud.ret_tipo_solicitud_pqrsf}
									</td>
									<td className='text-sm'>
										{obtenerNombreDependencia(solicitud.ret_id_dependencia)}
									</td>
									<td className='text-sm'>{solicitud.ret_descripcion}</td>
									<td className='text-sm'>{solicitud.ret_fecha_envio}</td>
									{tieneFechaAsignacion && (
										<td className='text-sm'>
											{solicitud.ret_fecha_asignacion
												? solicitud.ret_fecha_asignacion
												: 'N/A'}
										</td>
									)}
									{tieneFechaRespuesta && (
										<td className='text-sm'>
											{solicitud.ret_fecha_respuesta
												? solicitud.ret_fecha_respuesta
												: 'N/A'}
										</td>
									)}
									<td className='text-sm'>
										<button className='btn'>Asignar</button>
									</td>
								</tr>
							))
						)
					) : (
						<tr>
							<td colSpan='7' className='text-center'>
								<Loading />
							</td>
						</tr>
					)}
				</tbody>
				<tfoot className='text-black'>
					<tr>
						<th>Id Radicado</th>
						<th>Tipo</th>
						<th>Dependencia</th>
						<th>Descripcion</th>
						<th>Fecha Envio</th>
						{tieneFechaAsignacion && <th>Fecha Asignacion</th>}
						{tieneFechaRespuesta && <th>Fecha de Respuesta</th>}
						<th>Asignar</th>
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
	isLoading: PropTypes.bool.isRequired,
};
export default Tabla;
