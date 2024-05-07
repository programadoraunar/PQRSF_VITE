import React from 'react';
import PropTypes from 'prop-types';
import { RiCloseCircleFill } from '@remixicon/react';
import { optionsDependencias } from '../../../utils/options';

function ModalSolicitudNormal({
	children,
	onClose,
	tipoIdentificacion,
	documentNumber,
	nombres,
	apellido,
	segundoApellido,
	direccion,
	celular,
	email,
	tipoSolicitud,
	dependencia,
	canal,
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
		<div className='w-[400px] lg:w-[500px] min-h-[100px] bg-white relative'>
			<div className='flex justify-between bg-blue-zodiac-950 py-3 px-4 '>
				<h1 className='text-white'>Resumen Solicitud</h1>
				<button className='' onClick={onClose}>
					<RiCloseCircleFill className='text-white' />
				</button>
			</div>
			<div className='tableMov max-h-[400px] lg:max-h-[600px] p-5'>
				{isLoading ? (
					<div>nada</div>
				) : (
					<div className='text-black'>
						<h2 className='text-lg font-gothicBold'>Información enviada:</h2>

						<div className='flex flex-col gap-3'>
							<p className='font-gothicBold'>Tipo de Identificacion: </p>
							<span>{tipoIdentificacion}</span>
							<p className='font-gothicBold'>Numero de Documento: </p>
							<span>{documentNumber}</span>
							<p className='font-gothicBold'>Nombres: </p>
							<span>{nombres}</span>
							<p className='font-gothicBold'>Apellido: </p>
							<span>{apellido}</span>
							<p className='font-gothicBold'>Tipo Solicitud: </p>
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
ModalSolicitudNormal.propTypes = {
	children: PropTypes.node.isRequired, // `children` debe ser un nodo y es obligatorio
	onClose: PropTypes.func.isRequired,
	dependencia: PropTypes.string.isRequired, // ID de la dependencia
	tipoSolicitud: PropTypes.string.isRequired, // Tipo de solicitud
	descripcion: PropTypes.string.isRequired, // Descripción de la solicitud
	isLoading: PropTypes.node,
};

export default ModalSolicitudNormal;
