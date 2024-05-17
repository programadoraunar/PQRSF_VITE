import React from 'react';
import PropTypes from 'prop-types';
import { RiCloseCircleLine } from '@remixicon/react';
import useObtenerNombre from '../../../utils/useObtenerNombre';

function ModalDetallesSolicitud({ solicitud, onClose }) {
	const { obtenerNombreEstado } = useObtenerNombre();
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-6 rounded-lg max-w-xl md:max-w-4xl w-full'>
				<div className='flex justify-between items-center pb-5'>
					<h2 className='text-xl font-bold'>Detalles de la Solicitud</h2>
					<button onClick={onClose}>
						<RiCloseCircleLine className='w-7 h-7 text-blue-900' />
					</button>
				</div>

				<p>
					<strong>ID Usuario:</strong> {solicitud.ret_id_usuario}
				</p>
				<p>
					<strong>Estado:</strong>{' '}
					{obtenerNombreEstado(solicitud.ret_id_estado)}
				</p>
				<p>
					<strong>Canal:</strong> {solicitud.ret_id_canal}
				</p>
				<p>
					<strong>Es Anónima:</strong> {solicitud.ret_es_anonima ? 'Sí' : 'No'}
				</p>
			</div>
		</div>
	);
}
ModalDetallesSolicitud.propTypes = {
	solicitud: PropTypes.shape({
		ret_id_usuario: PropTypes.string,
		ret_id_estado: PropTypes.number,
		ret_id_canal: PropTypes.string,
		ret_es_anonima: PropTypes.bool,
	}).isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ModalDetallesSolicitud;
