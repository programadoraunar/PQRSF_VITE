import React from 'react';
import { RiCloseCircleFill } from '@remixicon/react';
import PropTypes from 'prop-types';
import { optionsDependencias } from '../../utils/options';

function Modal({
	children,
	onClose,
	dependencia,
	tipoSolicitud,
	descripcion,
	isLoading,
}) {
	// Función para obtener el nombre de la dependencia basado en su ID
	const obtenerNombreDependencia = idDependencia => {
		const dependenciaEncontrada = optionsDependencias.find(
			dep => dep.id === idDependencia,
		);
		return dependenciaEncontrada
			? dependenciaEncontrada.nombre
			: 'Dependencia Desconocida';
	};
	return (
		<div className=''>
			<div className='w-[400px] lg:w-[500px] min-h-[100px] bg-white relative'>
				<div className='flex justify-between bg-blue-zodiac-950 py-3 px-4'>
					<h1 className=''>Resumen Solicitud</h1>
					<button className='' onClick={onClose}>
						<RiCloseCircleFill className='text-whiter' />
					</button>
				</div>
				{isLoading ? (
					<div>nada</div>
				) : (
					<div className='text-black p-5'>
						<h2
							className='text-lg font-gothicBold
						'
						>
							Información enviada:
						</h2>

						<div className='flex flex-col gap-3'>
							<h4 className='font-gothicBold'>Tipo Solicitud: </h4>
							<span>{tipoSolicitud}</span>
							<p className='font-gothicBold'>Dependencia:</p>
							<span>{obtenerNombreDependencia(dependencia)}</span>
							<p className='font-gothicBold'>Descripcion:</p>
							<span>{descripcion}</span>
						</div>
						{children}
					</div>
				)}
			</div>
		</div>
	);
}
Modal.propTypes = {
	children: PropTypes.node.isRequired, // `children` debe ser un nodo y es obligatorio
	onClose: PropTypes.func.isRequired,
	dependencia: PropTypes.string.isRequired, // ID de la dependencia
	tipoSolicitud: PropTypes.string.isRequired, // Tipo de solicitud
	descripcion: PropTypes.string.isRequired, // Descripción de la solicitud
	isLoading: PropTypes.node,
};

export default Modal;
