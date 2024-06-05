import React, { useEffect, useState } from 'react';

function ModalConfirmacion({ onClose }) {
	const [botonActivo, setBotonActivo] = useState(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setBotonActivo(true); // Activar el botón después de 5 segundos
		}, 5000);

		return () => clearTimeout(timeoutId); // Limpiar el timeout en la limpieza del efecto
	}, []);
	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 '>
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
				<div className='flex justify-center'>
					<button
						onClick={onClose}
						disabled={!botonActivo} // Desactivar el botón si el estado es false
						className={`px-4 py-2 ${botonActivo ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'} text-white rounded mr-2`}
					>
						Sí
					</button>
					<button
						onClick={onClose}
						className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
					>
						No
					</button>
				</div>
			</div>
		</div>
	);
}

export default ModalConfirmacion;
