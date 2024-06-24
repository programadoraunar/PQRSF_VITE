import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import InfoSolicitante from '../../components/dependencia/details/InfoSolicitante';
import Loading from '../../components/ui/Loading';
import InfoSolicitud from '../../components/dependencia/details/InfoSolicitud';
import Tabla from '../../components/dependencia/details/Tabla';
import ModalConfirmacion from '../../components/dependencia/details/ModalConfirmacion';
import { Toaster } from 'sonner';
import { RiCheckDoubleFill } from '@remixicon/react';
import useSolicitudDetails from '../../hooks/useSolicitudDetails';
import { handleDescargarAdjunto } from '../../utils/utilsAdminyDepen/utils';

/**
 * Componente para mostrar los detalles de una solicitud de PQRSF de una dependencia.
 * Utiliza el parámetro de URL `id` para obtener los detalles de la solicitud específica.
 *
 * @component
 * @returns {JSX.Element} Los detalles de la solicitud, incluyendo información del solicitante si no es anónima.
 */
function SolicitudDetailsDependencia() {
	const { id } = useParams();
	const { data, error } = useSolicitudDetails(id);

	const [mostrarModal, setMostrarModal] = useState(false);
	const handleCerrarModal = () => {
		console.log(mostrarModal);
		setMostrarModal(false);
	};

	if (!data) {
		return <Loading />;
	}
	if (error) {
		return <div>error</div>;
	}
	return (
		<div className='flex flex-col lg:flex-row lg:gap-5'>
			{/** Condicional data.esanonima === false: Muestra el componente InfoSolicitante solo si la solicitud no es anónima. */}
			{data.esanonima === false && <InfoSolicitante data={data} />}
			<div className='flex flex-col items-center'>
				<section id='infoSolicitud' className='w-full'>
					<InfoSolicitud data={data} />
					<Tabla data={data} />
					<button
						className='btn'
						onClick={() => {
							handleDescargarAdjunto(data.urladjunto); // Asegúrate de que data.urladjunto contiene la ruta del archivo
						}}
					>
						Descargar Adjunto
					</button>

					<button
						onClick={() => setMostrarModal(true)}
						className='btn btn-neutral'
					>
						Cerrar Solicitud
					</button>
				</section>
			</div>
			{mostrarModal && (
				<ModalConfirmacion onClose={handleCerrarModal} idPqrsf={id} />
			)}
			<Toaster
				icons={{
					success: <RiCheckDoubleFill />,
				}}
			/>
		</div>
	);
}

export default SolicitudDetailsDependencia;
