import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerDetallesPqrsfDependencia } from '../../supabase/actions/getPqrsfFuntionsDepen';
import InfoSolicitante from '../../components/dependencia/details/InfoSolicitante';
import Loading from '../../components/ui/Loading';
import InfoSolicitud from '../../components/dependencia/details/InfoSolicitud';
import Tabla from '../../components/dependencia/details/Tabla';
import ModalConfirmacion from '../../components/dependencia/details/ModalConfirmacion';
import { supabase } from '../../supabase/client';
import { Toaster, toast } from 'sonner';
import { RiCheckDoubleFill } from '@remixicon/react';

/**
 * Componente para mostrar los detalles de una solicitud de PQRSF de una dependencia.
 * Utiliza el parámetro de URL `id` para obtener los detalles de la solicitud específica.
 *
 * @component
 * @returns {JSX.Element} Los detalles de la solicitud, incluyendo información del solicitante si no es anónima.
 */
function SolicitudDetailsDependencia() {
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [mostrarModal, setMostrarModal] = useState(false);
	const handleCerrarModal = () => {
		console.log(mostrarModal);
		setMostrarModal(false);
	};
	/**
	 * Efecto para obtener los detalles de la solicitud de PQRSF cuando el componente se monta o el ID cambia.
	 */
	useEffect(() => {
		/**
		 * Función para obtener los detalles de la solicitud de PQRSF.
		 */
		async function fetchData() {
			try {
				setIsLoading(true);
				const nuevosDatos = await obtenerDetallesPqrsfDependencia(id);
				setData(nuevosDatos.data[0]); // Suponiendo que quieres el primer elemento
				console.log(nuevosDatos.data[0]);
			} catch (error) {
				console.error(
					'Error al obtener los últimos 7 registros:',
					error.message,
				);
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, [id]);

	if (isLoading) {
		return <Loading />;
	}

	if (!data) {
		return <p>No se encontraron datos.</p>; // Manejo del caso donde no hay datos
	}

	const handleDescargarAdjunto = async url => {
		const { data } = supabase.storage.from('archivos').getPublicUrl(url);
		// Verificar si la URL contiene "null"
		if (data.publicUrl.includes('/null')) {
			toast('Sin archivo adjunto!', {
				description: 'La solicitud no contiene un archivo adjunto',
				duration: 5000,
				position: 'bottom-center',
				unstyled: true,
				classNames: {
					toast:
						'bg-[#FDF7E5] p-4 text-black font-gothicRegular rounded-lg border-l-4 border-[#FF5733]',
					title: 'text-xl font-gothicBold',
				},
			});
			console.log('No hay archivo adjunto.');
			return;
		}
		// Construir la URL de descarga con el parámetro ?download
		const downloadUrl = `${data.publicUrl}?download=${url}`;
		console.log(downloadUrl);

		// Crear un enlace temporal y hacer clic en él para iniciar la descarga
		const link = document.createElement('a');
		link.href = downloadUrl;
		link.setAttribute('download', 'adjunto_pqrsf'); // Especificar el nombre de descarga
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
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
			{mostrarModal && <ModalConfirmacion onClose={handleCerrarModal} />}
			<Toaster
				icons={{
					success: <RiCheckDoubleFill />,
				}}
			/>
		</div>
	);
}

export default SolicitudDetailsDependencia;
