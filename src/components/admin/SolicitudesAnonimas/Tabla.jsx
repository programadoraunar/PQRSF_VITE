import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loading from '../../ui/Loading';
import useObtenerNombre from '../../../utils/useObtenerNombre';
import { actualizarEstadoSolicitud } from '../../../supabase/actions/postPqrsFuntions';
import { Toaster, toast } from 'sonner';
import { RiCheckDoubleFill } from '@remixicon/react';
/**
 * Componente de tabla para mostrar una lista de solicitudes anónimas.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.datosSolicitudes - Array of solicitud objects.
 * @param {boolean} props.isLoading - Boolean indicating if the data is still loading.
 * @returns {JSX.Element} The rendered component.
 */
function Tabla({ datosSolicitudes, isLoading }) {
	const [solicitudes, setSolicitudes] = useState(datosSolicitudes);
	useEffect(() => {
		setSolicitudes(datosSolicitudes);
	}, [datosSolicitudes]);
	const tieneFechaAsignacion = datosSolicitudes.some(
		solicitud => solicitud.ret_fecha_asignacion,
	);
	const tieneFechaRespuesta = datosSolicitudes.some(
		solicitud => solicitud.ret_fecha_respuesta,
	);
	const asignar = async (idPqrsf, estado) => {
		try {
			const result = await actualizarEstadoSolicitud(idPqrsf, estado);

			if (result) {
				const solicitudModificada = solicitudes.find(
					solicitud => solicitud.ret_id_radicado === idPqrsf,
				);
				if (solicitudModificada) {
					const fechaActual = new Date();
					const año = fechaActual.getFullYear();
					const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // El mes se indexa desde 0, por eso sumamos 1
					const dia = String(fechaActual.getDate()).padStart(2, '0');
					const fechaFormateada = `${año}-${mes}-${dia}`;
					solicitudModificada.ret_fecha_asignacion = fechaFormateada; // Establece la fecha de asignación formateada
					solicitudModificada.ret_id_estado = 2; // cambia el estado para asignar
					// Actualiza la solicitud en el estado local
					setSolicitudes(prevSolicitudes =>
						prevSolicitudes.map(solicitud =>
							solicitud.ret_id_pqrsf === idPqrsf
								? solicitudModificada
								: solicitud,
						),
					);
					toast('¡Asignanada!', {
						description:
							'La solicitud ha sido asiganada a la dependecia correspondiente .',
						duration: 5000,
						position: 'bottom-center',
						unstyled: true,
						classNames: {
							toast:
								'bg-[#FDF7E5] p-4 text-black font-gothicRegular rounded-lg border-l-4 border-[#ca6d15]',
							title: 'text-xl font-gothicBold',
						},
					});
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const { obtenerNombreDependencia, obtenerNombreEstado, obtenerColorEstado } =
		useObtenerNombre();
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
						<th>Estado</th>
						<th>Asignar</th>
					</tr>
				</thead>
				<tbody>
					{!isLoading ? (
						solicitudes.length === 0 ? (
							<tr>
								<td colSpan='7' className='text-center'>
									No hay datos disponibles
								</td>
							</tr>
						) : (
							solicitudes.map(solicitud => (
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
												: 'No Hay Fecha'}
										</td>
									)}
									{tieneFechaRespuesta && (
										<td className='text-sm'>
											{solicitud.ret_fecha_respuesta
												? solicitud.ret_fecha_respuesta
												: 'N/A'}
										</td>
									)}
									<td
										className={`${obtenerColorEstado(solicitud.ret_id_estado)} text-sm`}
									>
										{obtenerNombreEstado(solicitud.ret_id_estado)}
									</td>
									<td className='text-sm'>
										<button
											onClick={() => asignar(solicitud.ret_id_radicado, 2)}
											className='btn'
										>
											Asignar
										</button>
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
						<th>Estado</th>
						<th>Asignar</th>
					</tr>
				</tfoot>
			</table>
			<Toaster
				icons={{
					success: <RiCheckDoubleFill />,
				}}
			/>
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
