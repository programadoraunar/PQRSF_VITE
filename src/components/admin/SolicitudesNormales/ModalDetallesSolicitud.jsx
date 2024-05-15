import React from 'react';
import PropTypes from 'prop-types';

function ModalDetallesSolicitud({ solicitud, onClose }) {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-6 rounded-lg max-w-xl w-full'>
				<h2 className='text-xl font-bold mb-4'>Detalles de la Solicitud</h2>
				<p>
					<strong>ID Usuario:</strong> {solicitud.ret_id_usuario}
				</p>
				<p>
					<strong>Estado:</strong> {solicitud.ret_id_estado}
				</p>
				<p>
					<strong>Canal:</strong> {solicitud.ret_id_canal}
				</p>
				<p>
					<strong>Es Anónima:</strong> {solicitud.ret_es_anonima ? 'Sí' : 'No'}
				</p>
				<button
					onClick={onClose}
					className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
				>
					Cerrar
				</button>
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
