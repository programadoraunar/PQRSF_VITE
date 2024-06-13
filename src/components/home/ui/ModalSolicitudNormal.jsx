import React from 'react';
import PropTypes from 'prop-types';
import { RiCloseCircleFill } from '@remixicon/react';
import { optionsDependencias, optionscanal } from '../../../utils/options';
import PdfDownloadButton from './PdfDownloadButton';

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
	semestre,
	programa,
	sede,
	numeroRadicado,
	fechaRadicado,
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
	const obtenerNombreCanal = idCanal => {
		const canalEncontrado = optionscanal.find(dep => dep.id === idCanal);
		return canalEncontrado ? canalEncontrado.nombre : 'Canal Desconocido';
	};

	return (
		<div className='w-full max-w-[90vw] sm:w-[550px] md:w-[600px] lg:w-[700px] xl:w-[800px] min-h-[100px] bg-white border rounded-lg'>
			<div className='flex justify-between bg-blue-zodiac-950 py-3 px-4'>
				<h1 className='text-white'>Resumen Solicitud</h1>
				<button className='' onClick={onClose}>
					<RiCloseCircleFill className='text-white' />
				</button>
			</div>
			<div className='overflow-y-auto max-h-[calc(100vh-200px)] p-5'>
				{isLoading ? (
					<div className='text-center'>Cargando...</div>
				) : (
					<div className='text-black'>
						<div className='flex justify-between items-center'>
							<h2 className='text-lg lg:text-xl font-gothicBold'>
								Información enviada:
							</h2>
						</div>
						<div className='py-4'>
							<p className='pb-4'>
								A continuación, podrás revisar un resumen detallado de tu
								solicitud. Te recomendamos descargar este resumen utilizando el
								botón de descarga proporcionado. Es crucial que conserves este
								documento, ya que contiene la información completa de tu
								solicitud, así como el número de radicado asignado. Este número
								es indispensable para realizar un seguimiento efectivo del
								trámite en el futuro. Asegúrate de guardarlo en un lugar seguro
								para futuras consultas.
							</p>
							<PdfDownloadButton
								tipoIdentificacion={tipoIdentificacion}
								documentNumber={documentNumber}
								nombres={nombres}
								apellido={apellido}
								segundoApellido={segundoApellido}
								direccion={direccion}
								celular={celular}
								email={email}
								tipoSolicitud={tipoSolicitud}
								dependencia={dependencia}
								descripcion={descripcion}
								sede={sede}
								numeroRadicado={numeroRadicado}
								fechaRadicado={fechaRadicado}
							/>
						</div>

						<div className='flex flex-col gap-3'>
							<div>
								<p className='font-gothicBold'>Tipo de Identificación:</p>
								<span>{tipoIdentificacion}</span>
							</div>
							<div>
								<p className='font-gothicBold'>Número de Documento:</p>
								<span>{documentNumber}</span>
							</div>
							<div>
								<p className='font-gothicBold'>Nombres:</p>
								<span>{`${nombres} ${apellido} ${segundoApellido}`}</span>
							</div>
							<div>
								<p className='font-gothicBold'>Dirección:</p>
								<span>{direccion}</span>
							</div>
							<div>
								<p className='font-gothicBold'>Celular:</p>
								<span>{celular}</span>
							</div>
							<div>
								<p className='font-gothicBold'>Email:</p>
								<span>{email}</span>
							</div>
							<div>
								<p className='font-gothicBold'>Tipo de Solicitud:</p>
								<span>{tipoSolicitud}</span>
							</div>
							<div>
								<p className='font-gothicBold'>Dependencia:</p>
								<span>{obtenerNombreDependencia(dependencia)}</span>
							</div>
							<div>
								<p className='font-gothicBold'>Canal:</p>
								<span>{obtenerNombreCanal(canal)}</span>
							</div>
							<div>
								<p className='font-gothicBold'>Sede:</p>
								<span>{sede}</span>
							</div>
							<div>
								<p className='font-gothicBold'>Descripción:</p>
								<span>{descripcion}</span>
							</div>
							{children}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
ModalSolicitudNormal.propTypes = {
	children: PropTypes.node.isRequired, // `children` debe ser un nodo y es obligatorio
	onClose: PropTypes.func.isRequired, // Función para cerrar el modal
	tipoIdentificacion: PropTypes.string.isRequired, // Tipo de identificación
	documentNumber: PropTypes.string.isRequired, // Número de documento
	nombres: PropTypes.string.isRequired, // Nombres
	apellido: PropTypes.string.isRequired, // Apellido
	segundoApellido: PropTypes.string.isRequired, // Segundo Apellido
	direccion: PropTypes.string.isRequired, // Dirección
	celular: PropTypes.string.isRequired, // Número de celular
	email: PropTypes.string.isRequired, // Correo electrónico
	tipoSolicitud: PropTypes.string.isRequired, // Tipo de solicitud
	dependencia: PropTypes.string.isRequired, // ID de la dependencia
	canal: PropTypes.string.isRequired, // Canal de la solicitud
	descripcion: PropTypes.string.isRequired, // Descripción de la solicitud
	sede: PropTypes.string,
	programa: PropTypes.string,
	semestre: PropTypes.string,
	isLoading: PropTypes.node,
	numeroRadicado: PropTypes.string,
	fechaRadicado: PropTypes.string,
};

export default ModalSolicitudNormal;
