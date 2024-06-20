import React, { useEffect, useState } from 'react';
import { actualizarEstadoSolicitud } from '../../../supabase/actions/postPqrsfFuntionsDepen';
import Loading from '../../ui/Loading';

function ModalConfirmacion({ onClose, idPqrsf }) {
	const [botonActivo, setBotonActivo] = useState(false);
	const [toast, setToast] = useState(false);
	const [error, setError] = useState(null);
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setBotonActivo(true); // Activar el botón después de 5 segundos
		}, 5000);

		return () => clearTimeout(timeoutId); // Limpiar el timeout en la limpieza del efecto
	}, []);
	const handleResponderSolicitud = async () => {
		setToast(true);
		setError(null);

		try {
			await actualizarEstadoSolicitud(idPqrsf, 3); // Aquí el '3' del estado "Respondido"

			setToast(false);
			onClose(); // Cerrar el modal después de la actualización exitosa
		} catch (err) {
			setToast(false);
			setError(
				'Error al actualizar el estado de la solicitud. Por favor, inténtalo de nuevo.',
			);
		}
	};
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white rounded-lg p-8 max-w-md'>
				<h2 className='text-xl font-gothicBold text-blue-zodiac-950 mb-4'>
					Confirmación
				</h2>
				<p className='text-gray-700 mb-4'>
					¿Estás seguro de que deseas continuar? Una vez que hagas clic en "Sí",
					el estado de la PQRSF se establecerá en "Respondida". Por favor,
					asegúrate de responder adecuadamente a la PQRSF en tu correo
					correspondiente.
				</p>
				{error && <p className='text-red-500 mb-4'>{error}</p>}
				<div className='flex justify-center'>
					<button
						onClick={handleResponderSolicitud}
						disabled={!botonActivo || toast} // Desactivar el botón si está desactivado o cargando
						className={`px-4 py-2 ${botonActivo && !toast ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} text-white rounded mr-2`}
					>
						{toast ? 'Actualizando...' : 'Sí'}
					</button>
					<button
						onClick={onClose}
						className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
						disabled={toast}
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalConfirmacion;
